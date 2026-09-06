function SGRainFrequency() {
    this.name = 'SG Rainfall | 1982 - 2012';
    this.id = 'sg-rain-fall-frequency';
    this.loaded = false;

    this.preload = function() {
        var self = this;
        this.data = loadTable(
            './data/weather/SGRainfall-1982-2012.csv', 'csv', 'header',
            function(table) {
                self.loaded = true;
            });
    };

    this.setup = function() {
        if (!this.loaded) {
            return;
        }

        textSize(16);
        this.select = createSelect();
        this.select.position(310,10);

        this.loadData();
        this.maxVal = this.getMaxValue();
        noLoop();

        var year = this.data.rows;
        for (var i = 0; i < year.length; i++)
        {
            if(year[i] != "")
            {
                this.select.option(this.data.getString([i],0));
            }
        }
    };

    this.loadData = function() 
    {
        this.dataArray = [];
        for (let i = 0; i < this.data.getRowCount(); i++) 
        {
            let row = [];
            for (let j = 1; j < this.data.getColumnCount(); j++) 

            {
                row.push(int(this.data.getString(i, j)));
            }

            this.dataArray.push(row);
        }
    };

    this.getMaxValue = function() 
    {
        let maxValue = 0;
        for (let row of this.dataArray) 

        {
            for (let value of row) 
            {
                if (value > maxValue) 
                {
                    maxValue = value;
                }
            }
        }
        return maxValue;
    };

    this.draw = function() 
    {
        if (!this.loaded) 
        {
            return;
        }

        let cellWidth = width / this.data.getColumnCount(0);
        let cellHeight = height / this.data.getRowCount(0);

        for (let i = 0; i < this.dataArray.length; i++) 
        {
            var selectedYear = this.select.option;

            for (let j = 0; j < this.dataArray[i].length; j++) 
            {
                if(this.select.selected() == this.data.get([i],0))
                {
                    let value = this.dataArray[i][j];
                    let col = this.colorMap(value, 0, this.maxVal);

                    fill(col);
                    rect(j * cellWidth + 58, i * cellHeight, cellWidth, cellHeight);


                    fill('255');
                    rect(1,410,55,130);
                    fill('black');
                    textSize(16);
                    text("Legend:", 1,405);

                    fill(182, 172, 230); 
                    rect(5, 418, 15, 15);

                    fill(160, 145, 237);
                    rect(5, 443, 15, 15);

                    fill(129, 107, 242);
                    rect(5, 468, 15, 15);

                    fill(76, 43, 240);
                    rect(5, 492, 15, 15);

                    fill(42, 0, 250);
                    rect(5, 520, 15, 15);


                    fill('black');
                    textSize(13);
                    text("≤ 5", 28, 430);
                    text("≤ 10", 28, 456);
                    text("≤ 15", 28, 481);
                    text("≤ 20", 28, 505);
                    text("> 20", 28, 532);
                }

            }
        }

        this.destroy = function() {
            this.select.remove();
        };
    };

    this.colorMap = function(value, min, max) {
        let ratio = (value - min) / (max - min);

        let r = map(ratio, 0, 1, 255, 0);
        let g = map(ratio, 0, 1, 255, 0);
        let b = 255;

        return color(r, g, b);
    };
}
