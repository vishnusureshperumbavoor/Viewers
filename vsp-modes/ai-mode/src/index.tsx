import { id } from './id';
import toolbarButtons from './toolbarButtons';
import initVspToolGroups from './initVspToolGroups';

const ohif = {
  layout: '@ohif/extension-default.layoutTemplateModule.viewerLayout',
  sopClassHandler: '@ohif/extension-default.sopClassHandlerModule.stack',
  hangingProtocol: '@ohif/extension-default.hangingProtocolModule.default',
  leftPanel: '@ohif/extension-default.panelModule.seriesList',
  rightPanel: '@ohif/extension-cornerstone.panelModule.panelMeasurement',
};

const cornerstone = {
  viewport: '@ohif/extension-cornerstone.viewportModule.cornerstone',
};

const extensionDependencies = {
  '@ohif/extension-default': '^3.0.0',
  '@ohif/extension-cornerstone': '^3.0.0',
};

function modeFactory({ modeConfiguration }) {
  return {
    id,
    routeName: 'template',
    displayName: 'VSP Mode',
    onModeEnter: ({ servicesManager, extensionManager, commandsManager }: withAppTypes) => {
      const { measurementService, toolbarService, toolGroupService } = servicesManager!.services;
      measurementService!.clearMeasurements();
      initVspToolGroups(extensionManager, toolGroupService, commandsManager);
      toolbarService!.register([...toolbarButtons]);
      toolbarService!.updateSection('primary', [
        'MeasurementTools',
        'Zoom',
        'Pan',
        'TrackballRotate',
        'WindowLevel',
        'Capture',
        'Layout',
        'Crosshairs',
        'MoreTools',
      ]);

      toolbarService!.updateSection('MeasurementTools', [
        'Length',
        'Bidirectional',
        'ArrowAnnotate',
        'EllipticalROI',
        'RectangleROI',
        'CircleROI',
        'PlanarFreehandROI',
        'SplineROI',
        'LivewireContour',
        'SpineSegmentation',
      ]);

      toolbarService!.updateSection('MoreTools', [
        'Reset',
        'rotate-right',
        'flipHorizontal',
        'ImageSliceSync',
        'ReferenceLines',
        'ImageOverlayViewer',
        'StackScroll',
        'invert',
        'Probe',
        'Cine',
        'Angle',
        'CobbAngle',
        'Magnify',
        'CalibrationLine',
        'TagBrowser',
        'AdvancedMagnify',
        'UltrasoundDirectionalTool',
        'WindowLevelRegion',
      ]);
    },
    onModeExit: ({ servicesManager }: withAppTypes) => {
      const {
        toolGroupService,
        syncGroupService,
        segmentationService,
        cornerstoneViewportService,
        uiDialogService,
        uiModalService,
      } = servicesManager.services;

      uiDialogService.hideAll();
      uiModalService.hide();
      toolGroupService.destroy();
      syncGroupService.destroy();
      segmentationService.destroy();
      cornerstoneViewportService.destroy();
    },
    validationTags: {
      study: [],
      series: [],
    },
    isValidMode: ({ modalities }) => {
      return { valid: true };
    },
    routes: [
      {
        path: 'template',
        layoutTemplate: ({ location, servicesManager }) => {
          return {
            id: ohif.layout,
            props: {
              leftPanels: [ohif.leftPanel],
              rightPanels: [ohif.rightPanel],
              viewports: [
                {
                  namespace: cornerstone.viewport,
                  displaySetsToDisplay: [ohif.sopClassHandler],
                },
              ],
            },
          };
        },
      },
    ],
    extensions: extensionDependencies,
    sopClassHandlers: [ohif.sopClassHandler],
  };
}

const mode = {
  id,
  modeFactory,
  extensionDependencies,
};

export default mode;
