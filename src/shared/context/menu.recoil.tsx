import { atom } from 'recoil';

export interface ITabs {
  // name: string;
  // en_name: string;
  name_code: string;
  path: string;
}

export interface IinitialMenu {
  // name: string;
  // en_name?: string;
  name_code?: string;
  icon?: string;
  active: boolean;
  path?: string;
  help_path?: string;
  views?: IinitialMenu[];
  tabs?: ITabs[];
}

const initialMenu: IinitialMenu[] = [
  {
    name_code: 'dashborad',
    icon: 'ViewDashboard',
    active: false,
    path: '/dashboard/dashboard',
    help_path: '/dashboard/dashboard',
  },
  {
    name_code: 'system',
    icon: 'Settings',
    active: false,
    views: [
      {
        name_code: 'system.system-management',
        active: false,
        path: '/system/system-management',
        help_path: '/system/system-management',
        tabs: [
          {
            name_code: 'system.system',
            path: '/system/system-management?tabs=system.system',
          },
          {
            name_code: 'system.resource-management',
            path: '/system/system-management?tabs=system.resource-management',
          },
          {
            name_code: 'system.ssh-ssl-version',
            path: '/system/system-management?tabs=system.ssh-ssl-version',
          },
          {
            name_code: 'system.host-configuration',
            path: '/system/system-management?tabs=system.host-configuration',
          },
          {
            name_code: 'system.environment',
            path: '/system/system-management?tabs=system.environment',
          },
          {
            name_code: 'system.management-statistics',
            path: '/system/system-management?tabs=system.management-statistics',
          },
          {
            name_code: 'system.user-access-limit',
            path: '/system/system-management?tabs=system.user-access-limit',
          },
          {
            name_code: 'system.watch-system',
            path: '/system/system-management?tabs=system.watch-system',
          },
          {
            name_code: 'system.system-verification',
            path: '/system/system-management?tabs=system.system-verification',
          },
        ],
      },
      {
        name_code: 'system.license-management',
        active: false,
        path: '/system/license-management',
        help_path: '/system/license-management',
        tabs: [
          {
            name_code: 'system.warranty-license',
            path: '/system/license-management?tabs=system.warranty-license',
          },
          {
            name_code: 'system.ssl-license',
            path: '/system/license-management?tabs=system.ssl-license',
          },
        ],
      },
      {
        name_code: 'system.boot-management',
        active: false,
        path: '/system/boot-management',
        help_path: '/system/boot-management',
        tabs: [
          {
            name_code: 'system.os-upgrade',
            path: '/system/boot-management?tabs=system.os-upgrade',
          },
          {
            name_code: 'system.dualboot-restart-shutdown',
            path: '/system/boot-management?tabs=system.dualboot-restart-shutdown',
          },
        ],
      },
      {
        name_code: 'system.configuration-management',
        active: false,
        path: '/system/configuration-management',
        help_path: '/system/configuration-management',
        tabs: [
          {
            name_code: 'system.config-check',
            path: '/system/configuration-management?tabs=system.config-check',
          },
          {
            name_code: 'system.config-management',
            path: '/system/configuration-management?tabs=system.config-management',
          },
          {
            name_code: 'system.config-save-reset',
            path: '/system/configuration-management?tabs=system.config-save-reset',
          },
          {
            name_code: 'system.syncing-configuration',
            path: '/system/configuration-management?tabs=system.syncing-configuration',
          },
          {
            name_code: 'system.backup',
            path: '/system/configuration-management?tabs=system.backup',
          },
          {
            name_code: 'system.dashboard',
            path: '/system/configuration-management?tabs=system.dashboard',
          },
        ],
      },
      {
        name_code: 'system.technical-assist',
        active: false,
        path: '/system/technical-assist',
        help_path: '/system/technical-assist',
        tabs: [
          {
            name_code: 'system.tech-assist',
            path: '/system/technical-assist?tabs=system.tech-assist',
          },
          {
            name_code: 'system.tcpdump',
            path: '/system/technical-assist?tabs=system.tcpdump',
          },
        ],
      },
      {
        name_code: 'system.time-management',
        active: false,
        path: '/system/time-management',
        help_path: '/system/time-management',
        tabs: [
          {
            name_code: 'system.time-configuration',
            path: '/system/time-management?tabs=system.time-configuration',
          },
          {
            name_code: 'system.ntp-configuration',
            path: '/system/time-management?tabs=system.ntp-configuration',
          },
          {
            name_code: 'system.login-timeout',
            path: '/system/time-management?tabs=system.login-timeout',
          },
        ],
      },
      {
        name_code: 'system.authentication-management',
        active: false,
        path: '/system/authentication-management',
        help_path: '/system/authentication-management',
        tabs: [
          {
            name_code: 'system.user',
            path: '/system/authentication-management?tabs=system.user',
          },
          {
            name_code: 'system.radius',
            path: '/system/authentication-management?tabs=system.radius',
          },
          {
            name_code: 'system.tacacs-plus',
            path: '/system/authentication-management?tabs=system.tacacs-plus',
          },
        ],
      },
      {
        name_code: 'system.failover',
        active: false,
        path: '/system/failover',
        help_path: '/system/failover',
      },
      {
        name_code: 'system.snmp',
        active: false,
        path: '/system/snmp',
        help_path: '/system/snmp',
        tabs: [
          {
            name_code: 'system.snmp-configuration',
            path: '/system/snmp?tabs=system.snmp-configuration',
          },
          {
            name_code: 'system.snmp-community',
            path: '/system/snmp?tabs=system.snmp-community',
          },
          {
            name_code: 'system.snmp-trap',
            path: '/system/snmp?tabs=system.snmp-trap',
          },
          {
            name_code: 'system.snmp-trap-host',
            path: '/system/snmp?tabs=system.snmp-trap-host',
          },
          {
            name_code: 'system.snmp-user',
            path: '/system/snmp?tabs=system.snmp-user',
          },
        ],
      },
      {
        name_code: 'system.notification',
        active: false,
        path: '/system/notification',
        help_path: '/system/notification',
        tabs: [
          {
            name_code: 'system.syslog',
            path: '/system/notification?tabs=system.syslog',
          },
          {
            name_code: 'system.email-alarm',
            path: '/system/notification?tabs=system.email-alarm',
          },
        ],
      },
      {
        name_code: 'system.dns',
        active: false,
        path: '/system/dns',
        help_path: '/system/dns',
      },
      {
        name_code: 'system.dhcp',
        active: false,
        path: '/system/dhcp',
        help_path: '/system/dhcp',
        tabs: [
          {
            name_code: 'system.dhcp-server',
            path: '/system/dhcp?tabs=system.dhcp-server',
          },
          {
            name_code: 'system.dhcp-relay',
            path: '/system/dhcp?tabs=system.dhcp-relay',
          },
        ],
      },
    ],
  },
  {
    name_code: 'network',
    icon: 'Globe',
    active: false,
    views: [
      {
        name_code: 'network.port',
        active: false,
        path: '/network/port',
        help_path: '/network/port',
        tabs: [
          {
            name_code: 'network.port-boundary',
            path: '/network/port?tabs=network.port-boundary',
          },
          {
            name_code: 'network.port-configuration',
            path: '/network/port?tabs=network.port-configuration',
          },
          {
            name_code: 'network.port-mirroring',
            path: '/network/port?tabs=network.port-mirroring',
          },
          {
            name_code: 'network.port-trunk',
            path: '/network/port?tabs=network.port-trunk',
          },
          {
            name_code: 'network.port-failover',
            path: '/network/port?tabs=network.port-failover',
          },
          {
            name_code: 'network.port-breakout',
            path: '/network/port?tabs=network.port-breakout',
          },
          {
            name_code: 'network.sfp-port',
            path: '/network/port?tabs=network.sfp-port',
          },
        ],
      },
      {
        name_code: 'network.link-sync',
        active: false,
        path: '/network/link-sync',
        help_path: '/network/link-sync',
      },
      {
        name_code: 'network.lacp-configuration',
        active: false,
        path: '/network/lacp-configuration',
        help_path: '/network/lacp-configuration',
        tabs: [
          {
            name_code: 'network.lacp-system',
            path: '/network/lacp-configuration?tabs=network.lacp-system',
          },
          {
            name_code: 'network.lacp',
            path: '/network/lacp-configuration?tabs=network.lacp',
          },
        ],
      },
      {
        name_code: 'network.vlan',
        active: false,
        path: '/network/vlan',
        help_path: '/network/vlan',
      },
      {
        name_code: 'network.stp-configuration',
        active: false,
        path: '/network/stp-configuration',
        help_path: '/network/stp-configuration',
        tabs: [
          {
            name_code: 'network.stp',
            path: '/network/stp-configuration?tabs=network.stp',
          },
          {
            name_code: 'network.rstp',
            path: '/network/stp-configuration?tabs=network.rstp',
          },
          {
            name_code: 'network.pvstp',
            path: '/network/stp-configuration?tabs=network.pvstp',
          },
          {
            name_code: 'network.mstp',
            path: '/network/stp-configuration?tabs=network.mstp',
          },
        ],
      },
      {
        name_code: 'network.mac',
        active: false,
        path: '/network/mac',
        help_path: '/network/mac',
      },
      {
        name_code: 'network.interface',
        active: false,
        path: '/network/interface',
        help_path: '/network/mac',
      },
      {
        name_code: 'network.routing-configuration',
        active: false,
        path: '/network/routing-configuration',
        help_path: '/network/routing-configuration',
        tabs: [
          {
            name_code: 'network.routing',
            path: '/network/routing-configuration?tabs=network.routing',
          },
          {
            name_code: 'network.management-routing',
            path: '/network/routing-configuration?tabs=network.management-routing',
          },
        ],
      },
      {
        name_code: 'network.nat',
        active: false,
        path: '/network/nat',
        help_path: '/network/nat',
      },
      {
        name_code: 'network.arp-configuration',
        active: false,
        path: '/network/arp-configuration',
        help_path: '/network/arp-configuration',
        tabs: [
          {
            name_code: 'network.arp',
            path: '/network/arp-configuration?tabs=network.arp',
          },
          {
            name_code: 'network.arp-filter',
            path: '/network/arp-configuration?tabs=network.arp-filter',
          },
          {
            name_code: 'network.arp-periodic',
            path: '/network/arp-configuration?tabs=network.arp-periodic',
          },
        ],
      },
      {
        name_code: 'network.lsn',
        active: false,
        path: '/network/lsn',
        help_path: '/network/lsn',
        tabs: [
          {
            name_code: 'network.lsn-snat-pool',
            path: '/network/lsn?tabs=network.lsn-snat-pool',
          },
          {
            name_code: 'network.lsn-nat-64',
            path: '/network/lsn?tabs=network.lsn-nat-64',
          },
          {
            name_code: 'network.lsn-dns-64',
            path: '/network/lsn?tabs=network.lsn-dns-64',
          },
        ],
      },
      {
        name_code: 'network.nd-proxy',
        active: false,
        path: '/network/nd-proxy',
        help_path: '/network/nd-proxy',
        tabs: [
          {
            name_code: 'network.neighbor',
            path: '/network/nd-proxy?tabs=network.neighbor',
          },
          {
            name_code: 'network.proxy',
            path: '/network/nd-proxy?tabs=network.proxy',
          },
        ],
      },
    ],
  },
  {
    name_code: 'lb',
    icon: 'org',
    active: false,
    views: [
      {
        name_code: 'lb.load-balancing',
        active: false,
        path: '/lb/load-balancing',
        help_path: '/lb/load-balancing',
      },
      {
        name_code: 'lb.gslb-configuration',
        active: false,
        path: '/lb/gslb-configuration',
        help_path: '/lb/gslb-configuration',
        tabs: [
          {
            name_code: 'lb.gslb-mode',
            path: '/lb/gslb-configuration?tabs=lb.gslb-mode',
          },
          {
            name_code: 'lb.reverse-gslb',
            path: '/lb/gslb-configuration?tabs=lb.reverse-gslb',
          },
          {
            name_code: 'lb.gslb',
            path: '/lb/gslb-configuration?tabs=lb.gslb',
          },
        ],
      },
      {
        name_code: 'lb.health-check-configuration',
        active: false,
        path: '/lb/health-check-configuration',
        help_path: '/lb/health-check-configuration',
        tabs: [
          {
            name_code: 'lb.health-check',
            path: '/lb/health-check-configuration?tabs=lb.health-check',
          },
          {
            name_code: 'lb.passive-health-check',
            path: '/lb/health-check-configuration?tabs=lb.passive-health-check',
          },
          {
            name_code: 'lb.dynamic-proximity',
            path: '/lb/health-check-configuration?tabs=lb.dynamic-proximity',
          },
        ],
      },
      {
        name_code: 'lb.real-server',
        active: false,
        path: '/lb/real-server',
        help_path: '/lb/real-server',
      },
      {
        name_code: 'lb.filter',
        active: false,
        path: '/lb/filter',
        help_path: '/lb/filter',
        tabs: [
          {
            name_code: 'lb.sp-filter',
            path: '/lb/filter?tabs=lb.sp-filter',
          },
          {
            name_code: 'lb.dynamic-filter',
            path: '/lb/filter?tabs=lb.dynamic-filter',
          },
          {
            name_code: 'lb.domain-filter',
            path: '/lb/filter?tabs=lb.domain-filter',
          },
        ],
      },
      {
        name_code: 'lb.pattern',
        active: false,
        path: '/lb/pattern',
        help_path: '/lb/pattern',
      },
      {
        name_code: 'lb.session-timeout',
        active: false,
        path: '/lb/session-timeout',
        help_path: '/lb/session-timeout',
      },
      {
        name_code: 'lb.schedule-manager',
        active: false,
        path: '/lb/schedule-manager',
        help_path: '/lb/schedule-manager',
      },
      {
        name_code: 'lb.prescript',
        active: false,
        path: '/lb/prescript',
        help_path: '/lb/prescript',
      },
    ],
  },
  {
    name_code: 'acceleration',
    icon: 'FinancialSolid',
    active: false,
    views: [
      {
        name_code: 'acceleration.ssl',
        active: false,
        path: '/acceleration/ssl',
        help_path: '/acceleration/ssl',
        tabs: [
          {
            name_code: 'acceleration.key',
            path: '/acceleration/ssl?tabs=acceleration.key',
          },
          {
            name_code: 'acceleration.certificate',
            path: '/acceleration/ssl?tabs=acceleration.certificate',
          },
          {
            name_code: 'acceleration.profile',
            path: '/acceleration/ssl?tabs=acceleration.profile',
          },
          {
            name_code: 'acceleration.client-authentication',
            path: '/acceleration/ssl?tabs=acceleration.client-authentication',
          },
          {
            name_code: 'acceleration.server-authentication',
            path: '/acceleration/ssl?tabs=acceleration.server-authentication',
          },
          {
            name_code: 'acceleration.ocsp-stapling',
            path: '/acceleration/ssl?tabs=acceleration.ocsp-stapling',
          },
          {
            name_code: 'acceleration.proxy',
            path: '/acceleration/ssl?tabs=acceleration.proxy',
          },
        ],
      },
      {
        name_code: 'acceleration.compression',
        active: false,
        path: '/acceleration/compression',
        help_path: '/acceleration/compression',
      },
      {
        name_code: 'acceleration.cache',
        active: false,
        path: '/acceleration/cache',
        help_path: '/acceleration/cache',
      },
      {
        name_code: 'acceleration.frontend-optimize',
        active: false,
        path: '/acceleration/frontend-optimize',
        help_path: '/acceleration/frontend-optimize',
      },
      {
        name_code: 'acceleration.icap',
        active: false,
        path: '/acceleration/icap',
        help_path: '/acceleration/icap',
      },
    ],
  },
  {
    name_code: 'security',
    icon: 'Encryption',
    active: false,
    views: [
      {
        name_code: 'security.access-control',
        active: false,
        path: '/security/access-control',
        help_path: '/security/access-control',
        tabs: [
          {
            name_code: 'security.system-access',
            path: '/security/access-control?tabs=security.system-access',
          },
          {
            name_code: 'security.management-access',
            path: '/security/access-control?tabs=security.management-access',
          },
        ],
      },
      {
        name_code: 'security.firewall',
        active: false,
        path: '/security/firewall',
        help_path: '/security/firewall',
        tabs: [
          {
            name_code: 'security.firewall-content',
            path: '/security/firewall?tabs=security.firewall-content',
          },
          {
            name_code: 'security.firewall-filter',
            path: '/security/firewall?tabs=security.firewall-filter',
          },
          {
            name_code: 'security.firewall-policy',
            path: '/security/firewall?tabs=security.firewall-policy',
          },
        ],
      },
      {
        name_code: 'security.dos-protect',
        active: false,
        path: '/security/dos-protect',
        help_path: '/security/dos-protect',
      },
      {
        name_code: 'security.qos',
        active: false,
        path: '/security/qos',
        help_path: '/security/qos',
      },
      {
        name_code: 'security.tcp-tuning',
        active: false,
        path: '/security/tcp-tuning',
        help_path: '/security/tcp-tuning',
      },
      {
        name_code: 'security.port-number-extension',
        active: false,
        path: '/security/port-number-extension',
        help_path: '/security/port-number-extension',
      },
      {
        name_code: 'security.multicast-bridge',
        active: false,
        path: '/security/multicast-bridge',
        help_path: '/security/multicast-bridge',
      },
      {
        name_code: 'security.mgmt-port-interface-forwarding',
        active: false,
        path: '/security/mgmt-port-interface-forwarding',
        help_path: '/security/mgmt-port-interface-forwarding',
      },
    ],
  },
  {
    name_code: 'log',
    icon: 'OpenSource',
    active: false,
    views: [
      {
        name_code: 'log.system-log',
        active: false,
        path: '/log/system-log',
        help_path: '/log/system-log',
      },
      {
        name_code: 'log.history-log',
        active: false,
        path: '/log/history-log',
        help_path: '/log/history-log',
      },
      {
        name_code: 'log.entry-log',
        active: false,
        path: '/log/entry-log',
        help_path: '/log/entry-log',
      },
    ],
  },
  {
    name_code: 'statistics',
    icon: 'AnalyticsView',
    active: false,
    views: [
      {
        name_code: 'statistics.cpu-memory',
        active: false,
        path: '/statistics/cpu-memory',
        help_path: '/statistics/cpu-memory',
      },
      {
        name_code: 'statistics.port-information',
        active: false,
        path: '/statistics/port-information',
        help_path: '/statistics/port-information',
      },
      {
        name_code: 'statistics.load-balancing',
        active: false,
        path: '/statistics/load-balancing',
        help_path: '/statistics/load-balancing',
      },
      {
        name_code: 'statistics.surge-protection-sure-connect',
        active: false,
        path: '/statistics/surge-protection-sure-connect',
        help_path: '/statistics/surge-protection-sure-connect',
      },
      {
        name_code: 'statistics.ssl-acceleration',
        active: false,
        path: '/statistics/ssl-acceleration',
        help_path: '/statistics/ssl-acceleration',
      },
      {
        name_code: 'statistics.compression',
        active: false,
        path: '/statistics/compression',
        help_path: '/statistics/compression',
      },
      {
        name_code: 'statistics.cache',
        active: false,
        path: '/statistics/cache',
        help_path: '/statistics/cache',
      },
      {
        name_code: 'statistics.report-configuration',
        active: false,
        path: '/statistics/report-configuration',
        help_path: '/statistics/report-configuration',
        tabs: [
          {
            name_code: 'statistics.report',
            path: '/statistics/report-configuration?tabs=statistics.report',
          },
          {
            name_code: 'statistics.schedule-management',
            path: '/statistics/report-configuration?tabs=statistics.schedule-management',
          },
          {
            name_code: 'statistics.user-defined-report',
            path: '/statistics/report-configuration?tabs=statistics.user-defined-report',
          },
        ],
      },
    ],
  },
  {
    name_code: 'download',
    icon: 'DownloadDocument',
    active: false,
    views: [
      {
        name_code: 'download.snmp',
        active: false,
        path: '/download/snmp',
        help_path: '/download/snmp',
      },
      {
        name_code: 'download.installation-guide',
        active: false,
        path: '/download/installation-guide',
        help_path: '/download/installation-guide',
      },
      {
        name_code: 'download.user-guide',
        active: false,
        path: '/download/user-guide',
        help_path: '/download/user-guide',
      },
      {
        name_code: 'download.cli-guide',
        active: false,
        path: '/download/cli-guide',
        help_path: '/download/cli-guide',
      },
      {
        name_code: 'download.case-study',
        active: false,
        path: '/download/case-study',
        help_path: '/download/case-study',
      },
      {
        name_code: 'download.mib-reference',
        active: false,
        path: '/download/mib-reference',
        help_path: '/download/mib-reference',
      },
    ],
  },
];

export const menuState = atom({
  key: 'menu/menuState',
  default: initialMenu,
});
