function PayGapByJob2017() {

    this.name = 'Pay gap by job: 2017';
    this.id = 'pay-gap-by-job-2017';

    this.loaded = false;

    this.pad = 20;
    this.dotSizeMin = 15;
    this.dotSizeMax = 40;


    this.preload = function() {
        var self = this;
        this.data = loadTable(
            './data/pay-gap/occupation-hourly-pay-by-gender-2017.csv', 'csv', 'header',
            function(table) {
                self.loaded = true;
            });

    };

    this.setup = function() {
    };

    this.destroy = function() {
    };

    this.draw = function() {
        if (!this.loaded) {
            return;
        }

        this.addAxes();

        var jobs = this.data.getColumn('job_subtype');
        var propFemale = this.data.getColumn('proportion_female');
        var payGap = this.data.getColumn('pay_gap');
        var numJobs = this.data.getColumn('num_jobs');

        propFemale = stringsToNumbers(propFemale);
        payGap = stringsToNumbers(payGap);
        numJobs = stringsToNumbers(numJobs);

        var propFemaleMin = 0;
        var propFemaleMax = 100;

        var payGapMin = -20;
        var payGapMax = 20;

        var numJobsMin = min(numJobs);
        var numJobsMax = max(numJobs);

        fill(255);
        stroke(0);
        strokeWeight(1);

        for (i = 0; i < this.data.getRowCount(); i++) {
            var x = map(propFemale[i], propFemaleMin, propFemaleMax, 0+this.pad, width - this.pad);
            var y = map(payGap[i], payGapMax, payGapMin, 0+this.pad, height - this.pad);
            var size =
                map(numJobs[i], numJobsMin, numJobsMax, this.dotSizeMin, this.dotSizeMax);
            ellipse(
                x, y, size, size
            );
        }
    };

    this.addAxes = function () {
        stroke(200);
        line(width / 2,
             0 + this.pad,
             width / 2,
             height - this.pad);

        line(0 + this.pad,
             height / 2,
             width - this.pad,
             height / 2);
    };
}
