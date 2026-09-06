function TechDiversityGender() {

    this.name = 'Tech Diversity: Gender';
    this.id = 'tech-diversity-gender';
    this.layout = {

        leftMargin: 130,
        rightMargin: width,
        topMargin: 30,
        bottomMargin: height,
        pad: 5,

        plotWidth: function() {
            return this.rightMargin - this.leftMargin;
        },
        grid: true,
        numXTickLabels: 10,
        numYTickLabels: 8,
    };

    this.midX = (this.layout.plotWidth() / 2) + this.layout.leftMargin;

    this.femaleColour = color(170, 140 ,171);
    this.maleColour = color(140, 149 , 171);

    this.femaleHover = color(226, 131 ,229);
    this.maleHover = color(61, 116, 245);
    this.loaded = false;

    this.preload = function() {
        var self = this;
        this.data = loadTable(
            './data/tech-diversity/gender-2018.csv', 'csv', 'header',
            function(table) {
                self.loaded = true;
            });

    };

    this.setup = function() {
        textSize(16);
    };

    this.destroy = function() {
    };

    this.draw = function() {
        if (!this.loaded) {
            return;
        }

        this.drawCategoryLabels();

        var lineHeight = (height - this.layout.topMargin) /
            this.data.getRowCount();

        for (var i = 0; i < this.data.getRowCount(); i++) {

            var lineY = (lineHeight * i) + this.layout.topMargin;

            var company = {
                'name':this.data.getString(i,"company"),
                'female':this.data.getNum(i,"female"),
                'male':this.data.getNum(i,"male")
            };

            fill(0);
            noStroke();
            textAlign('right', 'top');
            text(company.name,
                 this.layout.leftMargin - this.layout.pad,
                 lineY);

            fill(this.femaleColour);
            rect(this.layout.leftMargin,
                 lineY,
                 this.mapPercentToWidth(company.female),
                 lineHeight - this.layout.pad);

            fill(this.maleColour);
            rect(this.layout.leftMargin+this.mapPercentToWidth(company.female), 
                 lineY, 
                 this.mapPercentToWidth(company.male), 
                 lineHeight - this.layout.pad);

            if(mouseX >= this.layout.leftMargin && 
               mouseX <= this.layout.leftMargin + this.mapPercentToWidth(company.female)+this.mapPercentToWidth(company.male)&& 
               mouseY >= lineY && 
               mouseY <= lineY +lineHeight)
            {
                fill(this.femaleHover);
                rect(this.layout.leftMargin,
                     lineY,
                     this.mapPercentToWidth(company.female),
                     lineHeight - this.layout.pad);

                fill(this.maleHover);
                rect(this.layout.leftMargin+this.mapPercentToWidth(company.female), 
                     lineY, 
                     this.mapPercentToWidth(company.male), 
                     lineHeight - this.layout.pad);

                fill(0);
                stroke(2);
                textAlign('center','center');
                text('Female : ' + company.female + '  |  ' + 'Male :' + company.male, mouseX, mouseY);


            }
        }

        // Draw 50% line
        stroke(150);
        strokeWeight(1);
        line(this.midX,
             this.layout.topMargin,
             this.midX,
             this.layout.bottomMargin);

    };

    this.drawCategoryLabels = function() {
        fill(0);
        noStroke();
        textAlign('left', 'top');
        text('Female',
             this.layout.leftMargin,
             this.layout.pad);
        textAlign('center', 'top');
        text('50%',
             this.midX,
             this.layout.pad);
        textAlign('right', 'top');
        text('Male',
             this.layout.rightMargin,
             this.layout.pad);
    };

    this.mapPercentToWidth = function(percent) {
        return map(percent,
                   0,
                   100,
                   0,
                   this.layout.plotWidth());
    };
}
