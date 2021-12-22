export const ietfTypes = {
  domain_name: {
    min: 1,
    max: 253,
    // pattern: /^[a-zA-Z0-9]*$/,
    pattern:
      /((([a-zA-Z0-9_]([a-zA-Z0-9\-_]){0,61})?[a-zA-Z0-9]\.)*([a-zA-Z0-9_]([a-zA-Z0-9\-_]){0,61})?[a-zA-Z0-9]\.?)|\./,
    host_pattern:
      /((([a-zA-Z0-9_]([a-zA-Z0-9\-_]){0,61})?[a-zA-Z0-9]\.)*([a-zA-Z0-9_]([a-zA-Z0-9\-_]){0,61})?[a-zA-Z0-9]\.?)|\.|@/,
  },
  uint8: {
    min: 0,
    max: 255,
  },
  uint16: {
    min: 0,
    max: 65535,
  },
  uint32: {
    min: 0,
    max: 4294967295,
  },
  uri: {
    min: 1,
    max: 2000,
  },
  mac_address: {
    pattern: /[0-9a-fA-F]{2}(:[0-9a-fA-F]{2}){5}/,
  },
};
