function nutrientIntakeTimeSeries() {

    this.name = 'UK Nutrient Intake | 1974 -2016';

    this.id = 'nutrient-intake';

    this.title = 'Nutrient intake per year (%)';

    this.xAxisLabel = 'Year';
    this.yAxisLabel = '%';

    this.colors = [];

    var marginSize = 35;

    this.layout = {
        marginSize: marginSize,

        leftMargin: marginSize * 2,
        rightMargin: width - marginSize,
        topMargin: marginSize,
        bottomMargin: height - marginSize * 2,
        pad: 5,

        plotWidth: function() {
            return this.rightMargin - this.leftMargin;
        },

        plotHeight: function() {
            return this.bottomMargin - this.topMargin;
        },

        grid: true,

        numXTickLabels: 10,
        numYTickLabels: 20,
    };


    this.loaded = false;

    this.preload = function() {
        var self = this;
        this.data = loadTable(
            './data/food/nutrients74-16.csv', 'csv', 'header',

            function(table) {
                self.loaded = true;
            });
    };

    this.setup = function() {

        if (!this.loaded) 
        {
            return;
        }

        textSize(16);
        this.select = createSelect();
        this.select.position(430,10);

        var nutrients = this.data.rows;
        for (var i = 0; i < nutrients.length; i++)
        {
            if(nutrients[i] != "")
            {
                this.select.option(this.data.getString([i],0));
            }
        }

        this.destroy = function() {
            this.select.remove();
        };


        this.startYear = Number(this.data.columns[1]);
        this.endYear = Number(this.data.columns[this.data.columns.length -1]);

        for(var i =0; i < this.data.getRowCount(); i++)
        {
            this.colors.push(color('red'));
        }


        this.minPercentage = 80;
        this.maxPercentage = 340;
    };

    this.draw = function() {
        if (!this.loaded) {
            return;
        }

        this.drawTitle();
        drawYAxisTickLabels(this.minPercentage,this.maxPercentage,this.layout,this.mapNutrientsToHeight.bind(this),0);

        drawAxis(this.layout);
        drawAxisLabels(this.xAxisLabel,this.yAxisLabel,this.layout);
        var numYears = this.endYear - this.startYear;


        for (var i = 0; i < this.data.getRowCount(); i++) 
        {
            var row = this.data.getRow(i);
            var previous = null;
            var l = row.getString(0);

            var nutCol = this.data.getColumn;
            var selectedNut = this.select.option;

            for(var j = 1; j < numYears; j++)
            {
                var current = {
                    'year':this.startYear + j -1, 
                    'weight':row.getNum(j)
                }
                
                for(n = 0; n < nutCol.length; n++)
                {
                    this.colors[i]
                    if(this.select.selected() == this.data.get([i],0))
                    {
                        if (previous != null)
                        {
                            stroke(this.colors[i]);
                            var x1 = this.mapYearToWidth(previous.year);
                            var x2 = this.mapYearToWidth(current.year);
                            var y1 = this.mapNutrientsToHeight(previous.weight);
                            var y2 = this.mapNutrientsToHeight(current.weight);
                            line(x1,y1,x2,y2);

                            var xLabelSkip = ceil(numYears / this.layout.numXTickLabels);
                            if (i * xLabelSkip >= 0) 
                            {
                                drawXAxisTickLabel(previous.year, this.layout, this.mapYearToWidth.bind(this));
                            }
                        }

                        else
                        {
                            noStroke();
                            fill(this.colors[i]);
                            text(l,220,this.mapNutrientsToHeight(current.weight)+5); 
                        }
                    }
                    else
                    {
                        if (previous != null)
                        {
                            stroke('black');
                            var x1 = this.mapYearToWidth(previous.year);
                            var x2 = this.mapYearToWidth(current.year);
                            var y1 = this.mapNutrientsToHeight(previous.weight);
                            var y2 = this.mapNutrientsToHeight(current.weight);
                            line(x1,y1,x2,y2);

                            var xLabelSkip = ceil(numYears / this.layout.numXTickLabels);

                            if (i * xLabelSkip >= 0) 
                            {
                                drawXAxisTickLabel(previous.year, this.layout, this.mapYearToWidth.bind(this));
                            }
                        }

                        else
                        {
                            noStroke();
                            fill('black');
                            text(l,220,this.mapNutrientsToHeight(current.weight)+5); 
                        }
                    }
                }
                previous = current;
            }
        }
    };

    this.drawTitle = function() {
        fill(0);
        noStroke();
        textAlign('center', 'center');

        text(this.title,
             (this.layout.plotWidth() / 2) + this.layout.leftMargin,
             this.layout.topMargin - (this.layout.marginSize / 2));
    };

    this.mapYearToWidth = function(value) {
        return map(value,
                   this.startYear,
                   this.endYear,
                   this.layout.leftMargin,
                   this.layout.rightMargin + 700);
    };

    this.mapNutrientsToHeight = function(value) {
        return map(value,
                   this.minPercentage,
                   this.maxPercentage,
                   this.layout.bottomMargin,
                   this.layout.topMargin);
    };
}
