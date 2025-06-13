import type { Button } from '@ohif/core/types';
import { toolbarButtons as defaultToolbarButtons } from '@ohif/mode-longitudinal';

export const setToolActiveToolbar = {
  commandName: 'setToolActiveToolbar',
  commandOptions: {
    toolGroupIds: ['default', 'mpr', 'SRToolGroup', 'volume3d'],
  },
};

const spineSegmentationButton: Button = {
  id: 'SpineSegmentation',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'icon-tool-livewire',
    label: 'Spine Segmentation',
    tooltip: 'Spine Segmentation',
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool',
  },
};

const toolbarButtons: Button[] = [spineSegmentationButton];
toolbarButtons.push(...defaultToolbarButtons);

export default toolbarButtons;
