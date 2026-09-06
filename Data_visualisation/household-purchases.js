function Ukfoodpurchases() {

    this.name = 'UK Household Purchases | 1997 -2022';
    this.id = 'uk-food-purchase';

    this.loaded = false;
    var bubble;
    var years;

    this.preload = function() {
        var self = this;
        this.data = loadTable('./data/purchases/foodpurchase74-22.csv', 'csv', 'header',
                              function(table) {
            self.loaded = true;
        });
    };

    this.setup = function() {
        if (!this.loaded) {
            return;
        }

        bubble = [];
        years = [];

        for(var i = 5; i < this.data.getColumnCount(); i++)
        {
            var s = this.data.columns[i];
            years.push(s);

            var b = createButton(s);

            b.mousePressed(function()
            {
                var yearString = this.elt.innerHTML;
                var yearIndex = years.indexOf(yearString);


                for(var i =0; i < bubble.length; i++)
                {
                    bubble[i].setYear(yearIndex);
                }
            })

        }

        for(var i = 0; i < this.data.getRowCount(); i++)
        {
            var r = this.data.getRow(i);
            var name = r.getString("L1");

            if( name != "")
            {

                var d = [];


                for(var j = 0 ; j < years.length; j++)
                {
                    var v = Number(r.get(years[j]));
                    d.push(v);
                }

                var b = new Bubble(name, d);
                b.setYear(0);

                bubble.push(b);
            }
        }
    };

    this.destroy = function() 
    {
        var buttons = selectAll('button');
        for (var i = 0; i < buttons.length; i++) 
        {
            buttons[i].remove();
        }
    };

    this.draw = function() {
        if (!this.loaded) {
            return;
        }
        background(255);

        push();
        textAlign(CENTER);
        translate(width/2, height/2);

        for(var i = 0; i < bubble.length; i++)
        {
            bubble[i].updateDirection(bubble);
            bubble[i].draw();
        }
        pop();
    }

    function Bubble(_name, _data)
    {
        this.name = _name;
        this.id = getRandomID();
        this.pos = createVector(0,0);
        this.dir = createVector(0,0);

        this.data = _data;

        this.color = color(random(0,255),random(0,255),random(0,255));
        this.size = 20;
        this.target_size = this.size;


        this.draw = function()
        {
            fill(this.color);
            ellipse(this.pos.x, this.pos.y, this.size);

            noStroke(0);
            fill(0);
            text(this.name, this.pos.x, this.pos.y);

            this.pos.add(this.dir);

            if(this.size < this.target_size)
            {
                this.size += 1;
            }
            else if(this.size > this.target_size)
            {
                this.size -= 1;   
            }
        }

        this.setYear = function(year_index)
        {
            var v = this.data[year_index];
            this.target_size = map(v, 0, 3600, 5, 200);
        }

        this.updateDirection = function(_bubble)
        {
            this.dir = createVector(0,0);

            for(var i = 0;  i < _bubble.length; i++)
            {
                if(_bubble[i].if != this.id)
                {
                    var v = p5.Vector.sub(this.pos, _bubble[i].pos);
                    var d = v.mag();

                    if(d < this.size/2 + _bubble[i].size/2)
                    {
                        if(d == 0)
                        {
                            this.dir.add(p5.Vector.random2D());
                        }
                        else
                        {
                            this.dir.add(v);
                        }

                    }
                }
            }

            this.dir.normalize();
        }
    }

    function getRandomID()
    {
        var alpha = "abcdefghijklmnopqrstuvwxyz0123456789";
        var s = "";
        for( var i = 0; i < 10 ; i++)
        {
            s += alpha[floor(random(0, alpha.length))];
        }

        return s;
    }
}