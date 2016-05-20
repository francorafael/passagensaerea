


// create angular app
var formApp = angular.module('formApp', ['ui.mask','ngCpfCnpj']);

// create angular controller
formApp.controller('mainController', function($scope, $http) {

    $scope.passengers = {
       adults: [ 1, 2, 3, 4, 5, 6, 7, 8],
       children: [0, 1, 2, 3, 4],
       infants: [0, 1, 2, 3, 4]
    };



    $scope.forms = [];

     /* PARCEL IMPLEMENTATION */
    var ParClass = function ParClass(options){
        var self = this;
        var defaults = { 
            'totalprice': 0,
            'parcels': 0,
            'price': 0,
            'selected': null
        }
        angular.extend(this, defaults, options);
        this.select = function(form){
            angular.forEach($scope.forms, function(formdict, i){
                if(formdict == form){
                    angular.forEach(formdict.numberofparcels, function(parcelitem, j){
                        parcelitem.selected = false;

                    });
                }
            });
            self.selected = true;
            // console.log(form);
        }
       
    }

     /* PASSENGERS IMPLEMENTATION */
    var PassengerClass = function PassengerClass(options){
        var self = this;
        var defaults = { 
            'nome': null,
            'sobrenome': null,
            'nascimento': null,
            'sexo': null,
            'tipo': null
        }
        angular.extend(this, defaults, options);
    }

    var FormClass = function FormClass(options){

        var self = this;
        var defaults = { 
            'info': null,
            'value': null,
            'taxes': null,
            'num_passengers': 1,
            'parcelas': null,
            'show':false,
            'adults' : 1,
            'children' : 0,
            'infants' : 0,
            'passengerslist' : {
                'adults' : [],
                'children' : [],
                'infants' : []
            },
            'numero_cartao' : null,
            'bandeira' : null,
            'codigo_cartao' : null,
            'nome_cartao' : null,
            'codigo_cartao' : null,
            'mes' : null,
            'ano' : null,
            'cpf_cartao' : null,
            'cep' : null,
            'endereco' : null,
            'numero' : null,
            'complemento' : null,
            'bairro' : null,
            'estado' : null,
            'cidade' : null,
            'nome_ticket' : null,
            'email_ticket' : null,
            'telefone_fixo_ticket' : null,
            'celular' : null,
            'operadora_celular_contato' : null,
            'agreement' : null,
            'disabledsubmit' : false,
            'numberofparcels': []
        }
        angular.extend(this, defaults, options);
        

        this.clearinsertform = function(){
            
            angular.forEach($scope.forms, function(form,i){
                form.show = false;
            });
            self.show = true;
            if(self.passengerslist.adults.length == 0){
                // INICIALIZA COM UM CAMPO
                var options = { 
                    'nome': '',
                    'sobrenome': '',
                    'nascimento': '',
                    'sexo': '',
                    'tipo': 'adult'
                }
                var passenger = new PassengerClass(options);
                self.passengerslist.adults.push(passenger);
            }
        }

        this.loadformadults = function(){
            
            if(self.passengerslist.adults.length > self.adults){
                var quantidaderemover = self.passengerslist.adults.length - self.adults;
                // console.log(quantidaderemover);
                for (var i = quantidaderemover; i > 0; i--) {
                    self.passengerslist.adults.splice(-1, 1);
                };
               
            } else{
                var quantidadeacres = self.adults - self.passengerslist.adults.length;
                for (var i = 0 ; i < quantidadeacres; i++) {
              
                    // console.log("entrou no for");
                    var options = { 
                    'nome': '',
                    'sobrenome': '',
                    'nascimento': '',
                    'sexo': '',
                    'tipo': 'adult'
                    }
                    var passenger = new PassengerClass(options);
                    self.passengerslist.adults.push(passenger);

                };
            }
            
        }

        this.loadformchildren = function(){
        
            if(self.passengerslist.children.length > self.children){
                var quantidaderemover = self.passengerslist.children.length - self.children;
                
                for (var i = quantidaderemover; i > 0; i--) {
                    self.passengerslist.children.splice(-1, 1 );
                };
               
            } else{
                var quantidadeacres = self.children - self.passengerslist.children.length;
                for (var i = 0 ; i < quantidadeacres; i++) {
              
                    var options = { 
                    'nome': '',
                    'sobrenome': '',
                    'nascimento': '',
                    'sexo': '',
                    'tipo': 'child'
                    }
                    var passenger = new PassengerClass(options);
                    self.passengerslist.children.push(passenger);

                };
            }
            
        }

        this.loadforminfants = function(){
        
            if(self.passengerslist.infants.length > self.infants){
                var quantidaderemover = self.passengerslist.infants.length - self.infants;
                for (var i = quantidaderemover; i > 0; i--) {
                    self.passengerslist.infants.splice(-1, 1 );
                };
               
            } else{
                var quantidadeacres = self.infants - self.passengerslist.infants.length;
                for (var i = 0 ; i < quantidadeacres; i++) {
              
                    var options = { 
                    'nome': '',
                    'sobrenome': '',
                    'nascimento': '',
                    'sexo': '',
                    'tipo': 'infant'
                    }
                    var passenger = new PassengerClass(options);
                    self.passengerslist.infants.push(passenger);

                };
            }
            
        }

        this.calculateparcels = function(){
            var par = (self.value - (self.value % self.parcelas)) / self.parcelas;
            if(par > 6){ par = 6 };

            for (var i = 1; i <= par; i++){
                 var options = { 
                    'totalprice': self.value,
                    'parcels': i,
                    'price': self.value/i,
                    'selected': false
                }
                if(i==1){
                    options.selected = true;
                }
                // setInterval(function(){ console.log(options); }, 10000);
                var parclasse = new ParClass(options);
                self.numberofparcels.push(parclasse);
                
            }

        }

        self.calculateparcels();

        this.updateparcels = function(){
            var sumpassenger = self.passengerslist.adults.length + self.passengerslist.children.length;
            
            var par = ((self.value * sumpassenger ) - ((self.value * sumpassenger) % self.parcelas)) / self.parcelas;
            if(par > 6){ par = 6 };
            self.numberofparcels = [] ;
            for (var i = 1; i <= par; i++){
                 var options = { 
                    'totalprice': self.value * sumpassenger,
                    'parcels': i,
                    'price': (self.value * sumpassenger)/i,
                    'selected': false
                }
                if(i==1){
                    options.selected = true;
                }
                var parclasse = new ParClass(options);
                self.numberofparcels.push(parclasse);
                
            }
        }

        this.finishim = function(){

            $scope.data = {
                'infoflight': self.info,
                'parcels': null,
                'price': null,
                'totalprice':false,
                'adult_list':[],
                'child_list':[],
                'infant_list':[],
                'numero_cartao' : self.numero_cartao,
                'bandeira' : self.bandeira,
                'codigo_cartao' : self.codigo_cartao,
                'nome_cartao' : self.nome_cartao,
                'mes' : self.mes,
                'ano' : self.ano,
                'cpf_cartao' : self.cpf_cartao,
                'cep' : self.cep,
                'endereco' : self.endereco,
                'numero' : self.numero,
                'complemento' : self.complemento,
                'bairro' : self.bairro,
                'estado' : self.estado,
                'cidade' : self.cidade,
                'nome_ticket' : self.nome_ticket,
                'email_ticket' : self.email_ticket,
                'telefone_fixo_ticket' : self.telefone_fixo_ticket,
                'celular' : self.celular,
                'operadora_celular_contato' : self.operadora_celular_contato,
                'agreement' : self.agreement
            };
            angular.forEach(self.numberofparcels, function(parcel, i){
                if(parcel.selected){
                    $scope.data.parcels = parcel.parcels;
                    $scope.data.price = parcel.price;
                    $scope.data.totalprice = parcel.totalprice;
                }
            })
            //desabilita botao submit ao primeiro click
            self.disabledsubmit = true;

            angular.forEach(self.passengerslist.adults, function(adult, i){
                $scope.data.adult_list.push("Nome:" + adult.nome + " " + adult.sobrenome + " - Nascimento:" + adult.nascimento + " - Sexo:" + adult.sexo); 
            })
            angular.forEach(self.passengerslist.children, function(child, i){
                $scope.data.child_list.push("Nome:" + child.nome + " " + child.sobrenome + " - Nascimento:" + child.nascimento + " - Sexo:" + child.sexo); 
            })
            angular.forEach(self.passengerslist.infants, function(infant, i){
                $scope.data.infant_list.push("Nome:" + infant.nome + " " + infant.sobrenome + " - Nascimento:" + infant.nascimento + " - Sexo:" + infant.sexo); 
            })

            if(self.agreement){
                $scope.data.agreement = "Termos aceitos";
            }




            $http({
              method: "post",
              url: "https://www.passagenspromo.com.br/home/001/formulario/index.php",
              data: $.param({'data' : $scope.data}),
              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
              
            }).
            success(function(response) {
                window.location = "http://www.passagenspromo.com.br/home/pedido-em-analise/";
                self.disabledsubmit = true;
            }).
            error(function(response) {
                alert("Houve um erro");
                self.disabledsubmit = false;
            });

          
        };

        

    }

    
    for (var i = 0; i <=5; i++) {
         var options = { 
            'info': null,
            'value': null,
            'taxes': null,
            'parcelas': null
        }
        if (i==0){
            options.info = ['GRU-MCZ 09/07/2016 | saída prevista de GRU às 16:00 | Aeronave A321'];
            options.value = 476;
            options.taxes = 26;
            options.parcelas = 10;
        }
        else if (i==1){
            options.info = ['MCZ-GRU 16/07/2016 | saída prevista de MCZ às 19:20 | Aeronave A321'];
            options.value = 476;
            options.taxes = 26;
            options.parcelas = 10;
        }
        else if (i==2){
            options.info =[
                'GRU-MCZ 09/07/2016 | saída prevista de GRU às 16:00 | Aeronave A321',
                'MCZ-GRU 16/07/2016 | saída prevista de MCZ às 19:20 | Aeronave A321'
            ];
            options.value = 951;
            options.taxes = 52;
            options.parcelas = 10;
        }
        else if (i==3){
            options.info = ['GRU-MCZ 16/07/2016 | saída prevista de GRU às 16:00 | Aeronave A321'];
            options.value = 476;
            options.taxes = 26;
            options.parcelas = 10;
        }
        else if (i==4){
            options.info = ['MCZ-GRU 23/07/2016 | saída prevista de MCZ às 19:20 | Aeronave A321'];
            options.value = 476;
            options.taxes = 26;
            options.parcelas = 10;
        }
        else if (i==5){
            options.info =[
                'GRU-MCZ 16/07/2016 | saída prevista de GRU às 16:00 | Aeronave A321',
                'MCZ-GRU 23/07/2016 | saída prevista de MCZ às 19:20 | Aeronave A321'
            ];
            options.value = 951;
            options.taxes = 52;
            options.parcelas = 10;
        }
        var form = new FormClass(options);
        $scope.forms.push(form);
    };

   

});
// end controller

$( document ).ready(function() {
    console.log('executa jquery ready');
    $( "input[name=parcels]" ).on( "click", function() {
        $(this).parent().parent().find('li').removeClass();
        $(this).parent().addClass('active');
    });

    $('#bandeira').ddslick({
        //data: ddData,
        width: "100%",

        imagePosition: "left",
        background: "#FFFFFF",
        
    });
    $('#companhia').ddslick({
        //data: ddData,
        width: "100%",
        imagePosition: "left",
        background: "#FFFFFF",
       
    });

    $('.help').mouseover(function(){
        $( '.popover',this ).show();
    });
    $('.help').mouseout(function(){
        $( '.popover',this ).hide();
    });



});