var phenotype = function (ph,opt) {    
    var opt = (opt) ? opt : {};
    var lErr = Infinity;
    var rd = function(){ return Math.random(); };
    var Creature = function() {
        this.it = 0;
        this.adn = [];        
        this.dn = function(){ 
            if (!this.adn[this.it]) { this.adn.push(rd()); }
            var r = this.adn[this.it]; this.it++;
            return r;
        };        
        this.rst = function(){ this.it = 0; };
    };
    // TODO - explain the effect of changing the option 'genlength' ( Length of the genôme )
    var genlength = (opt.genlength) ? opt.genlength : 1;
    var pheno = function(cr) {
        cr.rst();
        ph(cr.dn.bind(cr));
    };
    // TODO - explain the effect of changing the option 'popsize' ( Number of creature )
    var popsize = (opt.popsize) ? opt.popsize : 100;
    var popu = [];
    var creatid = 0;
    for (let index = 0; index < popsize; index++) {
        popu.push(new Creature());
    }
    // TODO - explain the effect of changing the option 'mutation' ( Level of detail used for changing a value for a parameter)
    var mutation = (opt.mutation) ? opt.mutation : 1000;
    var gen = 0;
    var setError = function(error) {       
        var cr = popu[creatid];        
        var errorNumber = Number(error);
        if (errorNumber !== NaN) {            
            cr.err = errorNumber;
            creatid++;
            if (creatid >= popu.length) {
                creatid = 0;
                popu.sort(function(a,b) { return a.err - b.err; });
                var nkill = ~~(popu.length*0.5);
                for (var i = 0; i < nkill; i++) { 
                    popu.pop();
                }
                var nrest = popu.length;
                var cadn = popu[0].adn;
                var nomut = ~~(nkill*0.5);           
                for (var i = 0; i < nkill; i++) {
                    var ncreature = new Creature();                                  
                    // TODO - error me if all creature have not the same dna length ?
                    for (var z = 0; z < cadn.length; z+=genlength) {
                        var rind = ~~(nrest*Math.random());
                        for (var b = 0; b < genlength; b++) {
                            var v = popu[rind].adn[z+b];                  
                            if (i > nomut && Math.random() > 0.9) {
                                v += (Math.random()-0.5)/mutation;
                                v = Math.max(Math.min(v,1),0);
                            }
                            // TODO - some time we get null value for a genome
                            ncreature.adn.push(v);
                        }                  
                    }
                    ncreature.err = lErr;
                    popu.push(ncreature);
                }
            } 
        }     
    };
    var evaluate = function() {  
        var cr = popu[creatid];
        pheno(cr);
    };
    return {
        score: function (fitness) {
            // TODO - error message if run was not called.
            setError(1/fitness);
        },
        error:  function (err) {
            // TODO - error message if run was not called.
            setError(err);
        },
        run: function () {
            evaluate();
        },
        save: function () {
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
