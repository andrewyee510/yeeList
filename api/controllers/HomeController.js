module.exports = {
	index: function(req, res) {
		
		res.view({
			title: 'Home',
			//navItems: navItems,
		});
	},

	about: function(req, res) {		
		res.view({
		});
	}
};