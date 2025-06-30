import { ServicesManager } from '@ohif/core/src/services';
import { addTool } from '@cornerstonejs/tools';
import SpineSegmentation from '../tools/SpineSegmentation';
import { LabelmapSlicePropagationTool, MarkerLabelmapTool } from '@cornerstonejs/ai';
import { RegionSegmentPlusTool } from '@cornerstonejs/tools';

export async function preRegistration({ servicesManager }: { servicesManager: ServicesManager }) {
  addTool(SpineSegmentation);
  addTool(LabelmapSlicePropagationTool);
  addTool(MarkerLabelmapTool);
  addTool(RegionSegmentPlusTool);
  return;
}
