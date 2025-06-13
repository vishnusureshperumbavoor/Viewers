import { ServicesManager } from '@ohif/core/src/services';
import { addTool } from '@cornerstonejs/tools';
import SpineSegmentation from '../tools/SpineSegmentation';

export async function preRegistration({ servicesManager }: { servicesManager: ServicesManager }) {
  addTool(SpineSegmentation);
  return;
}
