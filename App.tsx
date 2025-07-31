import React, { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import NetworkMonitor from "./components/NetworkMonitor";
import BackupManager from "./components/BackupManager";
import Settings from "./components/Settings";
import Alerts from "./components/Alerts";
import { Monitor, HardDrive, Settings as SettingsIcon, Bell, Activity } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [alerts, setAlerts] = useState([]);

  // Simular dados em tempo real
  useEffect(() => {
    // ... lógica de simulação ...
  }, []);

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: Activity },
    { id: 'network', name: 'Rede', icon: Monitor },
    { id: 'backup', name: 'Backup', icon: HardDrive },
    { id: 'alerts', name: 'Alertas', icon: Bell },
    { id: 'settings', name: 'Configurações', icon: SettingsIcon },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard alerts={alerts} />;
      case 'network':
        return <NetworkMonitor />;
      case 'backup':
        return <BackupManager />;
      case 'alerts':
        // Criei um novo estado setAlerts para esse componente
        // O `Alerts` precisa de um `setAlerts` para as funcionalidades como marcar como resolvido
        return <Alerts alerts={alerts} setAlerts={setAlerts} />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard alerts={alerts} />;
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-gray-800/30 backdrop-blur-sm border-r border-gray-700 min-h-screen">
          <div className="p-4">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                        activeTab === item.id
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                          : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                      }`}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {item.name}
                      {item.id === 'alerts' && alerts.length > 0 && (
                        <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">
                          {alerts.length}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;