window['__SDM_URL__'] = '__SDM_URL_PLACEHOLDER__'
window['__K2DB_URL__'] = '__K2DB_PLACEHOLDER__'
window['__K2DB_ST_URL__'] = '__K2DB_ST_URL_PLACEHOLDER__'
window['__AUDIT_URL__'] = '__AUDIT_PLACEHOLDER__'
window['__TUB_URL__'] = '__TUB_URL_PLACEHOLDER__'
window['__STORAGE_HUB__'] = '__STORAGE_HUB_PLACEHOLDER__'
window['__REQ_TIMEOUT__'] = Number('__REQ_TIMEOUT_PLACEHOLDER__')
window['__DATAROWS_SIZE__'] = Number('__DATAROWS_SIZE_PLACEHOLDER__')
window['__BATCHLOAD_URL__'] = '__BATCHLOAD_URL_PLACEHOLDER__'
window['__PAS_URL__'] = '__PAS_URL_PLACEHOLDER__'
window['__OPS_URL__'] = '__OPS_URL_PLACEHOLDER__'

window['__USER_URL__'] = ''

var EngineeringMachinery = 'EngineeringMachinery'
var EnvironmentalProtection = 'EnvironmentalProtection'
var WindElectricity = 'WindElectricity'
var Default = 'Default'

var __DOMAINS__ = {}

__DOMAINS__[Default] = {
  fieldGroup: 'fieldGroup',
  asset: 'asset',
  field: 'field'
}

__DOMAINS__[EngineeringMachinery] = {
  fieldGroup: '设备类型',
  asset: '设备',
  field: '传感器'
}

__DOMAINS__[EnvironmentalProtection] = {
  fieldGroup: '污染源自动监控',
  asset: '监控对象',
  field: '监控指标'
}

__DOMAINS__[WindElectricity] = {
  fieldGroup: 'fieldGroup',
  asset: 'asset',
  field: 'field'
}

window['__DOMAIN__'] = Default

window['__SCHEMA__'] = __DOMAINS__[__DOMAIN__]
