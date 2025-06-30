import React from 'react';

import { Toolbox } from '@ohif/extension-default';
import PanelSegmentation from './panels/PanelSegmentation';
import ActiveViewportWindowLevel from './components/ActiveViewportWindowLevel';
import PanelMeasurement from './panels/PanelMeasurement';

const getPanelModule = ({ commandsManager, servicesManager, extensionManager }: withAppTypes) => {
  const wrappedPanelSegmentation = ({ configuration }) => {
    return (
      <PanelSegmentation
        commandsManager={commandsManager}
        servicesManager={servicesManager}
        extensionManager={extensionManager}
        configuration={{ ...configuration }}
      />
    );
  };

  const wrappedPanelSegmentationNoHeader = ({ configuration }) => {
    return (
      <PanelSegmentation
        commandsManager={commandsManager}
        servicesManager={servicesManager}
        extensionManager={extensionManager}
        configuration={{ ...configuration }}
      />
    );
  };

  const wrappedPanelSegmentationWithTools = ({ configuration }) => {
    const { toolbarService } = servicesManager.services;

    return (
      <>
        <Toolbox
          buttonSectionId={toolbarService.sections.segmentationToolbox}
          title="Segmentation Tools"
        />
        <PanelSegmentation
          commandsManager={commandsManager}
          servicesManager={servicesManager}
          extensionManager={extensionManager}
          configuration={{ ...configuration }}
        />
      </>
    );
  };

  const aiTools = ({ configuration }) => {
    const { toolbarService } = servicesManager.services;

    return (
      <>
        <button
          style={{
            background: 'linear-gradient(90deg, #007bff 0%, #0056b3 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '10px 20px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            margin: '10px 0',
            transition: 'background 0.3s',
          }}
          onMouseOver={e => (e.currentTarget.style.background = '#0056b3')}
          onMouseOut={e =>
            (e.currentTarget.style.background = 'linear-gradient(90deg, #007bff 0%, #0056b3 100%)')
          }
        >
          Auto Spine Segmentation
        </button>
      </>
    );
  };

  return [
    {
      name: 'activeViewportWindowLevel',
      component: () => {
        return <ActiveViewportWindowLevel servicesManager={servicesManager} />;
      },
    },
    {
      name: 'panelMeasurement',
      iconName: 'tab-linear',
      iconLabel: 'Measure',
      label: 'Measurement',
      component: PanelMeasurement,
    },
    {
      name: 'panelSegmentation',
      iconName: 'tab-segmentation',
      iconLabel: 'Segmentation',
      label: 'Segmentation',
      component: wrappedPanelSegmentation,
    },
    {
      name: 'panelSegmentationNoHeader',
      iconName: 'tab-segmentation',
      iconLabel: 'Segmentation',
      label: 'Segmentation',
      component: wrappedPanelSegmentationNoHeader,
    },
    {
      name: 'panelSegmentationWithTools',
      iconName: 'tab-segmentation',
      iconLabel: 'Segmentation',
      label: 'Segmentation',
      component: wrappedPanelSegmentationWithTools,
    },
    {
      name: 'aiTools',
      iconName: 'tab-segmentation',
      iconLabel: 'Segmentation',
      label: 'AI Tools',
      component: aiTools,
    },
  ];
};

export default getPanelModule;
