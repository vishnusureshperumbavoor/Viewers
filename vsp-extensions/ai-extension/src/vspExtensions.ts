import { id } from './id';
import { toolNames } from './init/aiToolNames';
import { preRegistration } from './init/preRegistration';

export default {
  id,
  preRegistration,
  getPanelModule: ({ servicesManager, commandsManager, extensionManager }) => {},
  getViewportModule: ({ servicesManager, commandsManager, extensionManager }) => {},
  getToolbarModule: ({ servicesManager, commandsManager, extensionManager }) => {},
  getLayoutTemplateModule: ({ servicesManager, commandsManager, extensionManager }) => {},
  getSopClassHandlerModule: ({ servicesManager, commandsManager, extensionManager }) => {},
  getHangingProtocolModule: ({ servicesManager, commandsManager, extensionManager }) => {},
  getCommandsModule: ({ servicesManager, commandsManager, extensionManager }) => {},
  getContextModule: ({ servicesManager, commandsManager, extensionManager }) => {},
  getDataSourcesModule: ({ servicesManager, commandsManager, extensionManager }) => {},
  getUtilityModule({ servicesManager }) {
    return [
      {
        name: 'tools',
        exports: {
          toolNames,
        },
      },
    ];
  },
};
