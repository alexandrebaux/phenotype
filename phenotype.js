var phenotype = function (ph,opt) {    

    var opt = (opt) ? opt : {};
    
    var rd = function(){ return Math.random(); };

    var ind = function() {
        this.it = 0;
        this.adn = [];        
        this.dn = function(){ 
            if (!this.adn[this.it]) { this.adn[this.it] = rd(); }
            var r = this.adn[this.it]; this.it++;
            return r;
        };        
        this.rst = function(){ this.it = 0; };
    };

    var pheno = function(cr) {
        cr.rst();
        ph(cr.dn.bind(cr));
    };

    var calculateStep = function (cadnLength, genlength) {
        for (var i = genlength; i > 0; i--) {
            if (cadnLength % i == 0) {
                return i;
            }
        }
        return 1;
    }

    var setError = function(error) {   

        var cr = popu[creatid];        
        var errorNumber = Number(error);

        if (errorNumber !== NaN) {            
            cr.err = errorNumber;
            creatid++;

            if (creatid >= popu.length) {

                var cadn = popu[0].adn;
                var nkill = ~~(popu.length*0.5);
                var nomut = ~~(nkill*0.5);   
                
                popu.sort(function(a,b) { return a.err - b.err; });
                popu.splice(popu.length - nkill, nkill); 

                var nrest = popu.length;
                        
                for (var i = 0; i < nkill; i++) {

                    var nind = new ind(); 

                    var step = calculateStep(cadn.length, genlength);

                    for (var z = 0; z < cadn.length; z+=step) {
                        var rind = ~~(nrest*Math.random());
                        for (var b = 0; b < step; b++) {
                            if (z+b < cadn.length) {
                                var v = popu[rind].adn[z+b];                  
                                if (i > nomut && Math.random() > 0.5) {
                                    v += (Math.random()-0.5)/mutation;
                                    v = Math.max(Math.min(v,1),0);
                                }
                                nind.adn.push(v);
                            }
                        }                  
                    }
                    
                    nind.err = lErr;
                    popu.push(nind);
                }

                creatid = 0;
                progressRate = (prevError - popu[0].err) / prevError;
                prevError = popu[0].err;

                updateOptions();

            }
        }     
    };

    var evaluate = function() {  
        var cr = popu[creatid];
        pheno(cr);
    };

    var updateOptions = function () {
        if (progressRate < 0.01) {
            popsize = Math.min(popsize * 1.1, 10000); 
            mutation = Math.max(mutation * 0.9, 10);
            genlength = Math.min(genlength * 1.1, 5);
        } else if (progressRate > 0.1) {
            popsize = Math.max(popsize * 0.9, 10); 
            mutation = Math.min(mutation * 1.1, 100000); 
            genlength = Math.max(genlength * 0.9, 1);
        }
    };

    var lErr = Infinity;
    var prevError = Infinity;
    var progressRate = 0;

    var genlength = (opt.genlength) ? opt.genlength : 1;
    var popsize = (opt.popsize) ? opt.popsize : 100;
    var mutation = (opt.mutation) ? opt.mutation : 1000;

    var popu = [];
    var creatid = 0;
    for (let index = 0; index < popsize; index++) {
        popu.push(new ind());
    }

    return {
        score: function (fitness) {
            setError(1/fitness);
        },
        error:  function (err) {
            setError(err);
        },
        run: function () {
            evaluate();
        },
        save: function () {
            popu.sort(function (a, b) {
                return a.err - b.err;
            });
            return popu[0].adn;
        },
        load: function (adn) {
            popu[0].adn = [];
            for (let index = 0; index < adn.length; index++) {
                const element = adn[index];                
                popu[0].adn.push(element);
            }
        }
    };
};
