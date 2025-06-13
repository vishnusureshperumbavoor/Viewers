import {
  Annotation,
  EventTypes,
  InteractionTypes,
  SVGDrawingHelper,
  ToolHandle,
} from '@cornerstonejs/tools/types';
import { IEnabledElement, Point2, Point3 } from '@cornerstonejs/core/types';
import { annotation, AnnotationTool } from '@cornerstonejs/tools';
import { addAnnotation } from '@cornerstonejs/tools/annotation/annotationState';
import { triggerAnnotationRenderForViewportIds } from '@cornerstonejs/tools/utilities';
import getViewportIdsWithToolToRender from '@cornerstonejs/tools/utilities/viewportFilters/getViewportIdsWithToolToRender';
import { getEnabledElement, utilities } from '@cornerstonejs/core';

class SpineSegmentation extends AnnotationTool {
  static toolName = 'SpineSegmentation';

  constructor(
    toolProps = {},
    defaultToolProps = {
      configuration: {
        labels: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7'],
        currentLabelIndex: -1,
        getTextCallback: callback => {
          const { labels, currentLabelIndex } = this.configuration;
          const text = labels[currentLabelIndex];
          this.configuration.currentLabelIndex = (currentLabelIndex + 1) % labels.length;
          callback(text);
        },
      },
    }
  ) {
    super(toolProps, defaultToolProps);
  }

  private isPointOutsideImageBounds(worldPos, image) {
    if (!image) {
      return false;
    }

    const { imageData, dimensions } = image;
    const index = utilities.transformWorldToIndex(imageData, worldPos);

    return !utilities.indexWithinDimensions(index, dimensions);
  }

  renderAnnotation = (
    enabledElement: IEnabledElement,
    svgDrawingHelper: SVGDrawingHelper
  ): boolean => {
    const { viewport } = enabledElement;
    const { element } = viewport;
    const annotations = annotation.state.getAnnotations(this.toolName, element);
    if (!annotations?.length) {
      return false;
    }
    annotations.forEach(annotation => {
      const { data } = annotation;
      const point = data.handles.points[0];
      const svg = 'http://www.w3.org/2000/svg';
      const canvasPoint = viewport.worldToCanvas(point);

      const text = document.createElementNS(svg, 'text');
      text.setAttribute('x', canvasPoint[0].toString());
      text.setAttribute('y', canvasPoint[1].toString());
      text.setAttribute('fill', 'yellow');
      text.setAttribute('font-size', '14px');
      text.setAttribute('text-anchor', 'middle');
      text.textContent = String(annotation.data.text);

      svgDrawingHelper.appendNode(text, `${annotation.annotationUID}-text`);
      svgDrawingHelper.setNodeTouched(`${annotation.annotationUID}-text`);
    });
    return true;
  };

  addNewAnnotation = (evt: EventTypes.InteractionEventType) => {
    const { currentPoints, element, viewportId } = evt.detail;
    const worldPos = currentPoints.world;
    const point: Point3 = [worldPos[0], worldPos[1], worldPos[2] ?? 0];
    const enabledElement = getEnabledElement(element);
    const { viewport } = enabledElement;
    this.configuration.currentLabelIndex =
      (this.configuration.currentLabelIndex + 1) % this.configuration.labels.length;

    if (this.isPointOutsideImageBounds(worldPos, viewport.getImageData())) {
      alert('Cant label outside image boundaries');
    }

    const annotation = {
      highlighted: true,
      data: {
        text: this.configuration.labels[this.configuration.currentLabelIndex] || '',
        handles: {
          points: [point, point],
          arrowFirst: false,
          activeHandleIndex: null,
          textBox: {
            hasMoved: false,
            worldPosition: point,
            worldBoundingBox: {
              topLeft: point,
              topRight: point,
              bottomLeft: point,
              bottomRight: point,
            },
          },
        },
      },
      metadata: {
        toolName: SpineSegmentation.toolName,
        viewportId: viewportId,
      },
    };
    const viewportIdsToRender = getViewportIdsWithToolToRender(element, this.getToolName());
    triggerAnnotationRenderForViewportIds(viewportIdsToRender);
    addAnnotation(annotation, element);
    return annotation;
  };

  cancel(element: HTMLDivElement) {
    throw new Error('Method not implemented.');
  }

  handleSelectedCallback(
    evt: EventTypes.InteractionEventType,
    annotation: Annotation,
    handle: ToolHandle,
    interactionType: InteractionTypes
  ): void {
    throw new Error('Method not implemented.');
  }

  toolSelectedCallback(
    evt: EventTypes.InteractionEventType,
    annotation: Annotation,
    interactionType: InteractionTypes,
    canvasCoords?: Point2
  ): void {
    throw new Error('Method not implemented.');
  }

  isPointNearTool(
    element: HTMLDivElement,
    annotation: Annotation,
    canvasCoords: Point2,
    proximity: number,
    interactionType: string
  ): boolean {
    throw new Error('Method not implemented.');
  }
}

export default SpineSegmentation;
