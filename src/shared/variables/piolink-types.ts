/**
 * TODO: 타입 선언 시 타입에 대한 설명 등 부가적인 정보를 주석으로 입력하도록 합니다.
 *       주석에 표기된 정보는 해당 타입을 사용하는 코드에서 mouse over 시 노출됩니다.
 */

const piolinkTypes = {
  /**
   * IP network format (A.B.C.D/mask)
   */
  ipv4_network: {
    pattern:
      /^(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\/([1-2]?[0-9]|3[0-2])$/,
  },

  /**
   * The ipv6-prefix type represents an IPv6 address prefix. The prefix length is given by the number following the slash character and must be less than or equal 128.
   */
  ipv6_network: {
    pattern:
      /((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(\/(([0-9])|([0-9]{2})|(1[0-1][0-9])|(12[0-8])))/,
  },

  /**
   * The ip-network type represents an IPv6 or IPv4 address prefix. The prefix length is given by the number following the slash character and must be less than or equal 32 or 128.
   */
  ip_network: {
    pattern:
      /(((([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))\/([1-2]?[0-9]|3[0-2]))|(((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(\/(([0-9])|([0-9]{2})|(1[0-1][0-9])|(12[0-8]))))/,
  },

  /**
   * IP address format (A.B.C.D)
   */
  ipv4_address: {
    pattern:
      /^(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(%[\p{N}\p{L}]+)?$/,
  },

  /**
   * The IPv6 address size is 128 bits. The preferred IPv6 address representation is: x:x:x:x:x:x:x:x
   */
  ipv6_address: {
    pattern:
      /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/,
  },

  ip_address: {
    pattern:
      /((([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))|(((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))))/,
  },

  /**
   * length "1..32"
   */
  t_name: {
    pattern: /^[a-zA-Z][0-9a-zA-Z-_]*$/,
    min: 1,
    max: 32,
  },

  t_rgslb_name: {
    pattern: /^[0-9a-zA-Z][0-9a-zA-Z-_.]*$/,
    min: 1,
    max: 72,
  },

  /**
   * length "1..32"
   */
  t_passive_healthid: {
    min: 1,
    max: 32,
  },

  /**
   * range 1..2048
   */
  t_realid: {
    min: 1,
    max: 2048,
  },

  /**
   * range 1..2048
   */
  t_healthid: {
    min: 1,
    max: 2048,
  },

  t_patternid: {
    min: 1,
    max: 512,
  },

  t_portnumber: {
    min: 1,
    max: 65535,
    pattern: /^([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/,
  },

  /**
   * Port number range ex) 80-90
   */
  t_portnumber_range: {
    pattern: /[1-9][0-9]*\\-[1-9][0-9]*/,
  },

  /**
   * Server weight
   * range 1..100
   */
  t_weight: {
    min: 1,
    max: 100,
  },

  /**
   * MAC Address ex. 01:00:aa:ab:cd:ef
   */
  t_macaddr: {
    pattern: /([0-9a-fA-F]{2}:){5}[0-9a-fA-F]{2}/,
  },

  /**
   * Priority
   * range 0..255
   */
  t_priority: {
    min: 0,
    max: 255,
  },

  t_256_priority: {
    min: 1,
    max: 256,
  },

  /**
   * range 1..8
   */
  t_domain_filterid: {
    min: 1,
    max: 2048,
  },

  t_dynamic_filterid: {
    min: 1,
    max: 8,
  },

  threshold_pps: {
    min: 0,
    max: 1000000,
  },

  t_time: {
    min: 0,
    max: 8640000, //100 days
  },

  t_subnet_bitmask: {
    min: 0,
    max: 32,
    pattern: /^([1-2]?[0-9]|3[0-2])$/,
  },

  t_subnet_ipmask: {
    pattern: /^((25[0-5]|2[0-5][0-9]|1?[0-9]{1,2})\.){3}(25[0-5]|2[0-5][0-9]|1?[0-9]{1,2})$/,
  },

  t_ipv6_subnet_ipmask: {
    pattern:
      /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/,
  },

  t_filter_id: {
    min: 1,
    max: 4096,
  },

  t_proxy_delay: {
    min: 0,
    max: 1000,
  },

  t_locktime: {
    min: 0,
    max: 10000000,
  },

  t_timeout: {
    min: 10,
    max: 3600,
  },

  t_not_ko: {
    pattern: /^((?![ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).)*$/,
  },

  // arp-filter
  t_arp_filter_id: {
    min: 1,
    max: 32,
  },

  t_dynamic_proximity_interval: {
    min: 1,
    max: 60,
  },

  t_dynamic_proximity_oid: {
    // eslint-disable-next-line no-useless-escape
    pattern: /^[0-9\.]*$/,
  },

  t_dynamic_proximity_community: {
    min: 0,
    max: 254,
  },

  t_hostname: {
    // eslint-disable-next-line no-useless-escape
    pattern: /\w(?:\.\w|\-*\w)*/,
    min: 2,
    max: 63,
  },

  /**
   * length "0..64"
   */
  t_description: {
    min: 0,
    max: 64,
  },

  /**
   * MIME-Type "^[a-zA-Z0-9!#$&.+-^_]{1,127}\/[a-zA-Z0-9!#$&.+-^_]{1,127}$"
   */
  t_mime_type: {
    pattern: /^[a-zA-Z0-9!#$&.+-^_]{1,127}\/[a-zA-Z0-9!#$&.+-^_*]{1,127}$/,
  },
  t_nginx_time_duration: {
    pattern: /^(\d+y)?(\d+M)?(\d+w)?(\d+d)?(\d+h)?(\d+m)?(\d+s)?(\d+)?$/,
    min: 1,
    max: 16,
  },
  t_hosts_hostname: {
    pattern: /[a-zA-Z][0-9a-zA-Z-_.~%]*/,
  },
  t_hosts_alias: {
    pattern: /[a-zA-Z][0-9a-zA-Z-_.~%]*/,
  },

  /**
   * piolink-warranty-license.yang
   * Ex)
   * license : 858B46DB98F81D8A8F
   * lvc : 0F4DFBFF
   */
  t_license: {
    pattern: /^[A-Z0-9]{18}$/,
  },
  t_lvc: {
    pattern: /^[A-Z0-9]{8}$/,
  },

  t_196_name: {
    pattern: /[0-9a-zA-Z][0-9a-zA-Z-_]*/,
    min: 1,
    max: 196,
  },

  t_date: {
    pattern:
      /([1-9]|0[1-9]|1[012])[/]([1-9]|0[1-9]|[12][0-9]|3[01])[/](19[7-9][0-9]|2[0-9]{3})\s([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-9]|0[0-9]|[1-5][0-9]):([0-9]|0[0-9]|[1-5][0-9])/,
  },

  t_day: {
    pattern: /([1-9]|[12][0-9]|3[01])|(([1-9]|[12][0-9]|3[01])-([1-9]|[12][0-9]|3[01]))/,
  },

  t_month: {
    pattern: /([1-9]|1[012])|(([1-9]|1[012])-([1-9]|1[012]))/,
  },

  t_hour: {
    pattern: /([0-9]|1[0-9]|2[0-3])|(([0-9]|1[0-9]|2[0-3])-([0-9]|1[0-9]|2[0-3]))/,
  },

  t_minute: {
    pattern: /([0-9]|[1-5][0-9])|([0-9]|[1-5][0-9])-([0-9]|[1-5][0-9])/,
  },

  t_second: {
    pattern: /([0-9]|[1-5][0-9])/,
  },

  t_16_name: {
    pattern: /[a-zA-Z][0-9a-zA-Z-_]*/,
    min: 1,
    max: 16,
  },

  t_192_name: {
    pattern: /[0-9a-zA-Z][0-9a-zA-Z-_]*/,
    min: 1,
    max: 192,
  },
  t_dhcp_range_ip_address: {
    pattern:
      /((25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})-((25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})/,
  },
  t_dhcp_host_name: {
    pattern:
      /((25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})-((25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})/,
  },

  t_tftp_type: {
    pattern:
      /((((25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1?[0-9]{1,2}))|((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))):[0-9a-zA-Z-_/.]+/,
  },

  t_lftp_type: {
    pattern:
      /([a-zA-Z0-9\\.\\-]+(\\:[a-zA-Z0-9\\.&amp;%\\$\\-]+)*@)*((((25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1?[0-9]{1,2}))|(((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))))\/((([0-9a-zA-Z-_])+\/)*)([0-9a-zA-Z-_.]+)*/,
  },

  t_tftp_ipaddr_path: {
    pattern:
      /((([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])):[^\\:\s]+/,
  },

  t_email: {
    pattern: /[^@]+@[^@]+.[^@]+/,
  },
  t_community_name: {
    // eslint-disable-next-line no-useless-escape
    pattern: /^[^\#\\\\\"][^\\\\\"]*/,
    min: 1,
    max: 254,
  },
  t_community_limit_oid: {
    // eslint-disable-next-line no-useless-escape
    pattern: /[a-zA-Z0-9\.\-]*/,
  },
  t_engine_id: {
    pattern: /[A-F0-9a-f]{10}.*/,
    min: 10,
    max: 64,
  },
  t_trap_host_passwd: {
    // eslint-disable-next-line no-useless-escape
    pattern: /[^\\\\]*/,
    min: 8,
    max: 64,
  },
  t_user_password: {
    min: 5,
    max: 20,
  },
  t_128: {
    min: 1,
    max: 128,
  },
  t_255: {
    min: 1,
    max: 255,
  },
  t_6000: {
    min: 0,
    max: 6000,
  },
  t_604800: {
    min: 0,
    max: 604800,
  },
  t_7500000: {
    min: 0,
    max: 7500000,
  },
  t_domain_host_name: {
    min: 1,
    max: 253,
    pattern:
      /(((([a-zA-Z0-9_]([a-zA-Z0-9\-_]){0,61})?[a-zA-Z0-9]\.)*([a-zA-Z0-9_]([a-zA-Z0-9\-_]){0,61})?[a-zA-Z0-9]\.?)|\.)|(@{0,1})|(\*{0,1})/,
  },
};

export default piolinkTypes;