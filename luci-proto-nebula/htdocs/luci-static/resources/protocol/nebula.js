'use strict';
'require ui';
'require uci';
'require rpc';
'require form';
'require network';

return network.registerProtocol('nebula', {
	getI18n: function () {
		return _('Nebula');
	},

	getIfname: function () {
		return this._ubus('l3_device') || this.sid;
	},

	getOpkgPackage: function () {
		return 'nebula';
	},

	isFloating: function () {
		return true;
	},

	isVirtual: function () {
		return true;
	},

	getDevices: function () {
		return null;
	},

	containsDevice: function (ifname) {
		return (network.getIfnameOf(ifname) == this.getIfname());
	},

	renderFormOptions: function (s) {
		var o;

		o = s.taboption('general', form.Value, 'config', _('Config File'), _('Required. Path to the .yml config file for this interface.'));
		o.rmempty = false;

	},

	deleteConfiguration: function () {
		uci.sections('network', 'nebula_%s'.format(this.sid), function (s) {
			uci.remove('network', s['.name']);
		});
	}
});
