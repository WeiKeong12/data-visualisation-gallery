function UKFoodSurvey() {

    this.name = 'UK Food Survey | 2018';
    this.id = 'food-survey';
    this.loaded = false;

    this.preload = function() {
        var self = this;
        this.data = loadTable(
            './data/food/Attitudestoukfood-2018.csv', 'csv', 'header',
            function(table) {
                self.loaded = true;
            });
    };

    this.setup = function() {
        if (!this.loaded) {
            console.log('Data not yet loaded');
            return;
        }

        this.select = createSelect();

        this.select.position(350,550);

        var Ques = this.data.columns;
        for (var i = 0; i < Ques.length; i++)
        {
            if(Ques[i]!="")
            {
                this.select.option(Ques[i]);
            }
        }
    };

    this.destroy = function() {
        this.select.remove();
    };

    this.pie = new PieChart(width / 2, height / 2, width * 0.4);

    this.draw = function() {
        if (!this.loaded) {
            console.log('Data not yet loaded');
            return;
        }

        var Qtype = this.select.value();
        var col = this.data.getColumn(Qtype);

        col = stringsToNumbers(col);

        var labels = this.data.getColumn(0);

        var colours = ['Green','#00ff00','Grey','Red','Maroon'];

        var title = 'Question: ' + Qtype;

        this.pie.draw(col, labels, colours, title);
    };
}
