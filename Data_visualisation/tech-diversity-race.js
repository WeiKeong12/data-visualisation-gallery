function TechDiversityRace() {

    this.name = 'Tech Diversity: Race';
    this.id = 'tech-diversity-race';
    this.loaded = false;

    this.preload = function() {
        var self = this;
        this.data = loadTable(
            './data/tech-diversity/race-2018.csv', 'csv', 'header',

            function(table) {
                self.loaded = true;
            });
    };

    this.setup = function() {
        if (!this.loaded) {
            return;
        }
        this.select = createSelect();
        this.select.position(width/2,10);

        var companies = this.data.columns;
        for (var i = 0; i < companies.length; i++)
        {
            if(companies[i]!="")
            {
                this.select.option(companies[i]);
            }
        }
    };

    this.destroy = function() {
        this.select.remove();
    };

    this.pie = new PieChart(width / 2, height / 2, width * 0.4);

    this.draw = function() {
        if (!this.loaded) {
            return;
        }

        var companyName = this.select.value();
        var col = this.data.getColumn(companyName);

        col = stringsToNumbers(col);

        var labels = this.data.getColumn(0);
        var colours = ['blue', 'red', 'green', 'pink', 'purple', 'yellow'];
        var title = 'Employee diversity at ' + companyName;

        this.pie.draw(col, labels, colours, title);
    };
}
