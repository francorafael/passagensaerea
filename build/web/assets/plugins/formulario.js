


var FrameEmitirUtils = (function($){

    function StringUtils() {}

    StringUtils.prototype.remover_acentos = function(string){
        var mapaAcentosHex = {
            a: /[\xE0-\xE6]/g,
            A: /[\xC0-\xC6]/g,
            e: /[\xE8-\xEB]/g,
            E: /[\xC8-\xCB]/g,
            i: /[\xEC-\xEF]/g,
            I: /[\xCC-\xCF]/g,
            o: /[\xF2-\xF6]/g,
            O: /[\xD2-\xD6]/g,
            u: /[\xF9-\xFC]/g,
            U: /[\xD9-\xDC]/g,
            c: /\xE7/g,
            C: /\xC7/g,
            n: /\xF1/g,
            N: /\xD1/g,
        };

        for ( var letra in mapaAcentosHex ) {
            var expressaoRegular = mapaAcentosHex[letra];
            string = string.replace( expressaoRegular, letra );
        }

        return string;
    };

    return {
        StringUtils: new StringUtils() //singleton
    }

})();


var FormularioPesquisaRodoviarioEmitir = (function($){
    function FormularioPesquisaRodoviarioEmitir(params){
        var def_params = {
                url_base: 'http://www.uaiviagens.com.br/',
                container: $('[formulario_rodoviario]'),
                antecedencia_minima: typeof _rodoviario_data_minima == "undefined" ? 0 : _rodoviario_data_minima,
                periodo_minimo: typeof _rodoviario_periodo_minimo == "undefined" ? 0 : _rodoviario_periodo_minimo,
                dados: {}
            },
            dados_default = {
                data_ida: '',
                data_volta: '',
                origem: '',
                destino: '',
                quantidade_passageiros: 1
            },
            filtro_default = {
                viacao_preferencial: ''
            },
            params = $.extend(def_params, params);

        params.dados = $.extend(dados_default, params.dados);
        params.filtro = $.extend(filtro_default, params.filtro);

        this.antecedencia_minima = params.antecedencia_minima;
        this.periodo_minimo = params.periodo_minimo;
        this.url_base = params.url_base;
        this.server_url = 'http://frame.passagenspromo.com.br/';
        this.$container = params.container;
        this.terminais = {};

        // Certificamos que a url termine com '/' no final
        if (this.url_base[this.url_base.length-1] != "index.html") {
            this.url_base += "index.html"
        }

        this.filtro = params.filtro;
        this.preencher_dados(params.dados);
    }
    FormularioPesquisaRodoviarioEmitir.init = function(params){
        FormularioPesquisaRodoviarioEmitir._instance = new FormularioPesquisaRodoviarioEmitir(params);
        return FormularioPesquisaRodoviarioEmitir._instance.init();
    };

    FormularioPesquisaRodoviarioEmitir.prototype.init = function(){
        this.load_events();
    };

    FormularioPesquisaRodoviarioEmitir.prototype.preencher_dados = function(dados){
        if(dados.data_ida != "") this.$container.find('[data_ida]').val(dados.data_ida);
        if(dados.data_volta != "") this.$container.find('[data_volta]').val(dados.data_volta);
        if(dados.origem != "") this.$container.find('[origem]').val(dados.origem);
        if(dados.destino != "") this.$container.find('[destino]').val(dados.destino);
        this.$container.find('[quantidade_passageiros]').val(dados.quantidade_passageiros);

        // Caso nÃƒÂ£o tenha data de volta ÃƒÂ© somente ida
        if (dados.data_volta == '' && dados.data_ida != '') {
             this.$container.find('[name=tipo_viagem][value=somente_ida]').attr('checked', true);
        }

    };


    FormularioPesquisaRodoviarioEmitir.prototype.load_events = function(){
        var self = this;
        self.load_datepickers();
        self.load_autocompletes();

        self.$container.find('input[name=tipo_viagem]').change(function() {
            $(this).attr('checked', 'checked');
            if (this.value == "somente_ida") {
                self.$container.find('[box_data_volta]').hide();
            } else {
                self.$container.find('[box_data_volta]').show();
            }
        });

        self.$container.find('[btn_pesquisar]').click(function(event){
            var new_window,
                url;
            event.preventDefault();
            if (!self.validate_form()) {
                return false;
            }
            url = self.get_url_pesquisa();
            location.href = url;
        });

        var check_placeholder = function(event){
            var $field = $(event.currentTarget);
            var val = $field.val(),
                placeholder = $field.attr('placeholder');

            var valor_final = val;

            if((val == '' || val == placeholder) && event.type == "focus")
                valor_final = '';
            else if((val == '' || val == placeholder) && event.type == "blur") {
                valor_final = placeholder;
                $(event.currentTarget).css('color', '#AAA');
            } else {
                valor_final = val;
                $(event.currentTarget).css('color', '');
            }

            $field.val(valor_final);
        };
        if(window.navigator.userAgent.indexOf('MSIE ') > 0) {
            self.$container.find('input[placeholder]').focus(check_placeholder);
            self.$container.find('input[placeholder]').blur(check_placeholder);

           //AtivaÃƒÂ§ÃƒÂ£o inicial do fallback do placeholder
           $.each(self.$container.find('[origem], [destino]'), function(i,field){
                $(field).focus();
                $(field).blur();
           });
       }
    };

    FormularioPesquisaRodoviarioEmitir.prototype.load_datepickers = function(){
        var self = this;
        this.$container.find('[widget=datepicker]').each(function(){
            var $input =$(this),
                $related_input = $($input.attr('related')),
                min_date = "today";

            if (typeof($(this).attr('data_ida')) != "undefined") {
                min_date = self.antecedencia_minima;
            }
            $(this).datepicker({
                minDate: min_date,
                dateFormat: "dd/mm/yy",
                changeMonth: false,
                onSelect: function( selectedDate ) {
                    var min_date, date;

                    if ($related_input) {
                        date = selectedDate.split('index.html'),
                        min_date = new Date(date[2], date[1] - 1, date[0]),
                        min_date = new Date(min_date.getTime() + self.periodo_minimo * 86400000);

                        $($related_input).datepicker("option", "minDate", min_date);
                        if(this.value && this.value != "dd/mm/aaaa")
                            $($related_input).datepicker("setDate", min_date);
                    }
                }
            });
        });
        FormularioPesquisaEmitir.load_datepicker_configs();
    };

    FormularioPesquisaRodoviarioEmitir.prototype.load_autocompletes = function(){
        var self = this;

        // TODO: copiado da base de hoteis para ter como base
        this.$container.find('[origem], [destino]').each(function(){
            var $input =$(this);
            $(this).autocomplete({
                delay: 500,
                minLength: 3,
                source: function(request, callback){
                    var texto = FrameEmitirUtils.StringUtils.remover_acentos(request.term).toLowerCase(),
                        $element = $($(this).element),
                        previous_request = null;

                    if (typeof(self.terminais[texto]) === "undefined") {
                        self._callback_autocomplete_rodoviario = function(data){
                            var terminais = $.parseJSON(data);
                            callback(terminais);
                            self.terminais[texto] = terminais;
                        };
                    /* Armazenamos o request para, sempre que for disparada uma pesquisa, caso
                       um request esteja em execucao ele seja abortado.
                    */
                    var previous_request = $element.data( "jqXHR" );
                    if( previous_request) {
                        previous_request.abort();
                    }
                    $element.data( "jqXHR", $.ajax({
                        url: self.server_url + 'get_terminais',
                        type: 'GET',
                        data: {'terminal': texto},
                        dataType: 'jsonp',
                        cache: true,
                        jsonpCallback: 'FormularioPesquisaRodoviarioEmitir._instance._callback_autocomplete_rodoviario'
                    }));

                    } else {
                        callback(self.terminais[texto]);
                    }
                }
            });
        });
    };

    FormularioPesquisaRodoviarioEmitir.prototype.validate_form = function(){
        valid_submit = true;
        this.$container.find('.validationMessage').remove();
        $.each(this.$container.find('input[required_message]:visible'), function(i, field){
            var $field = $(field);
            if($field.attr('data_volta') && $('input[value=somente_ida]').attr('checked') == 'checked')
        return;
            if($field.val() == '' || $field.val() == $field.attr('placeholder')) {
                $field.css('border-color', 'red');
                $field.parent().append('<span class="validationMessage">'+$field.attr('required_message')+'</span>');
                $field.focus(function(event){
            $(event.currentTarget).css('border-color', '');
            $(event.currentTarget).parent().find('.validationMessage').remove();
        });
                valid_submit = false;
            }
        });
        return valid_submit;
    };

    FormularioPesquisaRodoviarioEmitir.prototype.get_url_pesquisa = function(){
        var self = this,
            partes = []
            form = this.$container;

        // Origem e destino tem um padrÃƒÂ£o ANSI para ser passado nas URLs, daÃƒÂ­
        // entra tambÃƒÂ©m o URLEncode
        partes.push(encodeURI(form.find('[origem]').val()));
        partes.push(encodeURI(form.find('[destino]').val()));

        partes.push(form.find('[data_ida]').val().replace(/\//g, "-"))

        // Considera a data de volta apenas se for voo ida e volta
        if (form.find('input[name=tipo_viagem]:checked').val() == 'ida_e_volta') {
            partes.push(form.find('[data_volta]').val().replace(/\//g, "-"))
        }

        partes.push(form.find('[quantidade_passageiros]').val())

        url = self.url_base + 'site/rodoviario/pesquisa/' + partes.join("index.html") + "/";

        if (this.filtro.viacao_preferencial) {
            url += this.filtro.viacao_preferencial + "/";
        }

        return url;
    };

    return FormularioPesquisaRodoviarioEmitir;
})(jQuery);


var FormularioPesquisaEmitir = (function($) {
    function FormularioPesquisaEmitir(param) {

        var defaults = {
            origem_internacional: true,
            antecedencia_minima: 1
        }

         // O usuÃ¡rio pode passar tanto apenas a url de pesquisa, quanto
        // um objeto, que contempla a url de pesquisa e um callback de redirecionamento
        if(typeof param == 'object') {
            $.extend(this, defaults, param);
        } else {
            $.extend(this, defaults, {
                'url_base': param
            });
        }

        // Certificamos que a url termine com '/' no final
        if (this.url_base[this.url_base.length-1] != "index.html") {
            this.url_base += "index.html"
        }

        this.server_url = 'http://frame.passagenspromo.com.br/';

        this.$container = $('[formulario_pesquisa_emitir]');
        this.$formulario_aereo = this.$container.find('[formulario_aereo]');
        this.$formulario_hotel = this.$container.find('[formulario_hotel]');
        this.$formulario_aereo_hotel = this.$container.find('[formulario_aereo_hotel]');
        this.$formulario_rodoviario = this.$container.find('[formulario_rodoviario]');

        this.cidades = {};
        this.aeroportos = [{"text": "Jaguaruna - Humberto Bortoluzzi (JJG)", "nacional": true}, {"text": "Lençois - Chapada Diamantina (LEC)", "nacional": true},{"text": "João Durval Carneiro - Feira de Santana, Bahia (FEC)", "nacional": true},{"text": "Teixera de Freitas, Teixeira de Freitas, Brasil (TXF)", "nacional": true}, {"text": "Campos dos Goytacazes - Rio de Janeiro - BR, Brasil (CAW)", "nacional": true}, {"text": "Porto Velho - RO, Brasil, Belmonte (PVH)", "nacional": true}, {"text": "Arax\u00c3\u00a1 - MG, Brasil (AAX)", "nacional": true}, {"text": "Sao Luis - MA, Brasil, Marechal Cunha Machado (SLZ)", "nacional": true}, {"text": "Bridgetown - Barbados, Grantley Adams International Airport (BGI)", "nacional": false}, {"text": "Sao Luis - MA, Brasil, Marechal Cunha Machado (SLZ)", "nacional": true}, {"text": "Londrina - PR, Brasil, Governador Jose Richa (LDB)", "nacional": true}, {"text": "Miami - FL, Estados Unidos (MIA)", "nacional": false}, {"text": "Alta Floresta - MT, Brasil, Deputado Benedito Santiago (AFL)", "nacional": true}, {"text": "Amsterdam, Holanda, Schiphol (AMS)", "nacional": false}, {"text": "Aracaju - SE, Brasil, Santa Maria (AJU)", "nacional": true}, {"text": "Aracatuba - SP, Brasil, Dario Guarita (ARU)", "nacional": true}, {"text": "Araguaina - TO, Brasil (AUX)", "nacional": true}, {"text": "Aspen - CO - Aspen-Pitkin County Airport -- Sardy Field(ASE)", "nacional": false}, {"text": "Assun\\u00e7\\u00e3o - Aeroporto Silvio Pettirossi(ASU)", "nacional": false}, {"text": "Asuncion - Presidente Stroessner(ASU)", "nacional": false}, {"text": "Atenas - Aeroporto Eleftherios Venizelos(ATH)", "nacional": false}, {"text": "Atenas, Grecia, Eleftherios Venizelos (ATH)", "nacional": false}, {"text": "Athens - Hellinikon International Airport(ATH)", "nacional": false}, {"text": "Atlanta - GA, Estados Unidos, Hartsfield-Jackson Atlanta (ATL)", "nacional": false}, {"text": "Auckland, Nova Zelandia (AKL)", "nacional": false}, {"text": "Baltimore - MD, Estados Unidos, Baltimore-Washington International Thurgood Marshall (BWI)", "nacional": false}, {"text": "Bangkok, Tailandia, Don Muang (DMK)", "nacional": false}, {"text": "Bangkok, Tailandia, Todos os Aeroportos (BKK)", "nacional": false}, {"text": "Barcelona, Espanha, El Prat (BCN)", "nacional": false}, {"text": "Barcelos - AM, Brasil (BAZ)", "nacional": true}, {"text": "Bariloche, Argentina, Teniente Luis Candelaria (BRC)", "nacional": false}, {"text": "Barreiras - BA, Brasil (BRA)", "nacional": true}, {"text": "Bauru - SP, Brasil, Bauru-Arealva (JTC)", "nacional": true}, {"text": "Beirute, Libano, Rafic Hariri (BEY)", "nacional": false}, {"text": "Belem - PA, Brasil, Val de Cans (BEL)", "nacional": true}, {"text": "Belo Horizonte  - MG, Brasil, Confins (CNF)", "nacional": true}, {"text": "Belo Horizonte - MG, Brasil, Pampulha (PLU)", "nacional": true}, {"text": "Belo Horizonte  - MG, Brasil, Todos os aeroportos (BHZ)", "nacional": true}, {"text": "Berlim, Alemanha, Schonefeld (SXF)", "nacional": false}, {"text": "Berlim, Alemanha, Tegel (TXL)", "nacional": false}, {"text": "Berlim, Alemanha, Tempelho (THF)", "nacional": false}, {"text": "Berlim, Alemanha, Todos os aeroportos (BER)", "nacional": false}, {"text": "Bilbao, Espanha (BIO)", "nacional": false}, {"text": "Birmingham - AL, Estados Unidos, Birmingham-Shuttlesworth (BHM)", "nacional": false}, {"text": "Birmingham, Inglaterra (BHX)", "nacional": false}, {"text": "Boa Vista - RR, Brasil, Atlas Brasil Cantanhede (BVB)", "nacional": true}, {"text": "Bogota, Colombia, El Dorado (BOG)", "nacional": false}, {"text": "Bologna, Italia, Guglielmo Marconi (BLQ)", "nacional": false}, {"text": "Bombaim - Mumbai, india, Chatrapati Shivaji (BOM)", "nacional": false}, {"text": "Bonito - MS, Brasil (BYO)", "nacional": true}, {"text": "Boston - MA, Estados Unidos, Logan (BOS)", "nacional": false}, {"text": "Brasilia - DF, Brasil, Presidente Juscelino Kubitschek (BSB)", "nacional": true}, {"text": "Brussels - National/Zaventem(BRU)", "nacional": false}, {"text": "Bruxelas - Aeroporto Brussels(BRU)", "nacional": false}, {"text": "Bruxelas, Belgica, Zaventem (BRU)", "nacional": false}, {"text": "Budapeste, Hungria, Ferihegy (BUD)", "nacional": false}, {"text": "Buenos Aires, Argentina, Ezeiza International (EZE)", "nacional": false}, {"text": "Buenos Aires, Argentina, Jorge Newbery (AEP)", "nacional": false}, {"text": "Buenos Aires - Todos os aeroportos(BUE)", "nacional": false}, {"text": "B\\u00fazios - RJ (BZC)", "nacional": true}, {"text": "Cabo Frio - RJ, Brasil (CFB)", "nacional": true}, {"text": "Cacador - SC, Brasil, Carlos Alberto da Costa Neves (CFC)", "nacional": true}, {"text": "Cairo, Egito (CAI)", "nacional": false}, {"text": "Calgary - AB, Canada (YYC)", "nacional": false}, {"text": "Campina Grande - PB, Brasil, Presidente Joao Suassuna (CPV)", "nacional": true}, {"text": "Campo Grande  - MS, Brasil (CGR)", "nacional": true}, {"text": "Cancun, Mexico (CUN)", "nacional": false}, {"text": "Cape Town, africa do Sul (CPT)", "nacional": false}, {"text": "Caracas, Venezuela, Siman Bolivar (CCS)", "nacional": false}, {"text": "Cartagena, Colombia, Rafael Nunez (CTG)", "nacional": false}, {"text": "Caruaru - PE, Brasil (CAU)", "nacional": true}, {"text": "Casablanca, Marrocos, Mohammed V International (CMN)", "nacional": false}, {"text": "Casablanca, Marrocos, Todos os Aeroportos (CAS)", "nacional": false}, {"text": "Cascavel - PR, Brasil (CAC)", "nacional": true}, {"text": "Caxias do Sul - RS, Brasil, Hugo Cantergiani (CXJ)", "nacional": true}, {"text": "Chapeco - SC, Brasil, Serafin Enoss Bertaso (XAP)", "nacional": true}, {"text": "Charlotte - NC, Estados Unidos, Charlotte Douglas (CLT)", "nacional": false}, {"text": "Chicago - IL, Estados Unidos, Midway (MDW)", "nacional": false}, {"text": "Chicago - IL, Estados Unidos, O'Hare International (ORD)", "nacional": false}, {"text": "Chicago - IL, Estados Unidos, Todos os aeroportos (CHI)", "nacional": false}, {"text": "Cidade da Guatemala, Guatemala, La Aurora (GUA)", "nacional": false}, {"text": "Cidade do Mexico, Mexico, Benito Juarez (MEX)", "nacional": false}, {"text": "Cingapura - Aeroporto Changi(SIN)", "nacional": false}, {"text": "Cingapura, Cingapura, Changi (SIN)", "nacional": false}, {"text": "Ciudad del Este - Todos os aeroportos(AGT)", "nacional": false}, {"text": "Ciudad Juarez - Abraham Gonzalez(CJS)", "nacional": false}, {"text": "Aeroporto de Caraj\u00e1s - Parauapebas (CKS)", "nacional": false}, {"text": "Cleveland - OH - Cleveland-Hopkins International Airport(CLE)", "nacional": false}, {"text": "Coari - AM, Brasil (CIZ)", "nacional": true}, {"text": "Cochabamba, Bolivia, Jarge Wilstermann (CBB)", "nacional": false}, {"text": "Colonia, Alemanha, Cologne-Bonn (CGN)", "nacional": false}, {"text": "Copenhagen, Dinamarca, Kastrup (CPH)", "nacional": false}, {"text": "Cordoba, Argentina, Pajas Blancas (COR)", "nacional": false}, {"text": "Corumba - MS, Brasil (CMG)", "nacional": true}, {"text": "Criciuma - SC, Brasil, Diomicio Freitas (CCM)", "nacional": true}, {"text": "Cruzeiro do Sul - AC, Brasil (CZS)", "nacional": true}, {"text": "Cuiaba - MT, Brasil, Marechal Rondon (CGB)", "nacional": true}, {"text": "Curacao, Antilhas Holandesas, Hato (CUR)", "nacional": false}, {"text": "Curitiba - PR, Brasil, Afonso Pena (CWB)", "nacional": true}, {"text": "Cuzco, Peru, Alejandro Velasco Astete (CUZ)", "nacional": false}, {"text": "Dallas - TX, Estados Unidos, Love Field (DAL)", "nacional": false}, {"text": "Dallas - TX, Estados Unidos, Todos os aeroportos (DFW)", "nacional": false}, {"text": "Delhi, india, Indira Gandhi (DEL)", "nacional": false}, {"text": "Denpasar, Indonesia, Ngurah Rai (DPS)", "nacional": false}, {"text": "Denver - CO, Estados Unidos (DEN)", "nacional": false}, {"text": "Detroit  - MI, Estados Unidos, Detroit Metropolitan Wayne County (DTW)", "nacional": false}, {"text": "Detroit - MI - Todos os aeroportos(DTT)", "nacional": false}, {"text": "Diamantina - MG, Brasil (DIA)", "nacional": true}, {"text": "Dourados - MS, Brasil, Francisco de Matos Pereira (DOU)", "nacional": true}, {"text": "Dubai, Emirados arabes Unidos (DXB)", "nacional": false}, {"text": "Dublin, Irlanda (DUB)", "nacional": false}, {"text": "Dunedin - Todos os aeroportos(DUD)", "nacional": false}, {"text": "Dusseldorf, Alemanha (DUS)", "nacional": false}, {"text": "Dzaoudzi, Mamoudzou - Pamandzi (DZA)", "nacional": false}, {"text": "Edimburgo, Escocia (EDI)", "nacional": false}, {"text": "Estocolmo - Aeroporto Arlanda(ARN)", "nacional": false}, {"text": "Estocolmo, Suecia, Arlanda (ARN)", "nacional": false}, {"text": "Estocolmo, Suecia, Bromma (BMA)", "nacional": false}, {"text": "Estocolmo, Suecia, Todos os aeroportos (STO)", "nacional": false}, {"text": "Faro, Portugal (FAO)", "nacional": false}, {"text": "Fernando de Noronha - PE, Brasil (FEN)", "nacional": true}, {"text": "Filadelfia - PA, Estados Unidos (PHL)", "nacional": false}, {"text": "Florenca, Italia, Peretola (FLR)", "nacional": false}, {"text": "Florianopolis - SC, Brasil, Hercilio Luz (FLN)", "nacional": true}, {"text": "Fonte Boa - AM, Brasil, Fonte Boa (FBO)", "nacional": true}, {"text": "Fortaleza - CE, Brasil, Pinto Martins (FOR)", "nacional": true}, {"text": "Fort Lauderdale - FL, Estados Unidos, Fort Lauderdale-Hollywood (FLL)", "nacional": false}, {"text": "Foz do Iguacu - PR, Brasil, Aeroporto das Cataratas (IGU)", "nacional": true}, {"text": "Frankfurt, Alemanha, Todos os Aeroportos (FRA)", "nacional": false}, {"text": "Funchal, Portugal (FNC)", "nacional": false}, {"text": "Genebra, Suica, Cointrin (GVA)", "nacional": false}, {"text": "GMP", "nacional": false}, {"text": "Goiania - GO, Brasil, Santa Genoveva (GYN)", "nacional": true}, {"text": "Governador Valadares - MG, Brasil (GVR)", "nacional": true}, {"text": "Guangzhou - Canton, China, Guangzhou Baiyun (CAN)", "nacional": false}, {"text": "Guayaquil, Equador, Simon Bolivar (GYE)", "nacional": false}, {"text": "Hamburgo, Alemanha, Hamburg-Fuhlsbuttel (HAM)", "nacional": false}, {"text": "Hannover, Alemanha, Hannover-Langenhagen (HAJ)", "nacional": false}, {"text": "Havana, Cuba, Jose Marti (HAV)", "nacional": false}, {"text": "Helsinque, Finlandia, Helsinki-Vantaa (HEL)", "nacional": false}, {"text": "Hong Kong, China (HKG)", "nacional": false}, {"text": "Honolulu - HI, Estados Unidos (HNL)", "nacional": false}, {"text": "Houston - TX, Estados Unidos, George Bush Intercontinental (IAH)", "nacional": false}, {"text": "Houston - TX, Estados Unidos, Todos os Aeroportos (HOU)", "nacional": false}, {"text": "Humaita - AM, Brasil (HIA)", "nacional": true}, {"text": "Ibiza, Espanha (IBZ)", "nacional": false}, {"text": "ICN", "nacional": false}, {"text": "Ilha de Comandatuba - BA, Brasil, Una (UNA)", "nacional": true}, {"text": "Ilheus - BA, Brasil, Jorge Amado (IOS)", "nacional": true}, {"text": "Imperatriz - MA, Brasil, Prefeito Renato Moreira (IMP)", "nacional": true}, {"text": "Indianapolis - IN, Estados Unidos (IND)", "nacional": false}, {"text": "IST", "nacional": false}, {"text": "Istambul - Aeroporto Ataturk(IST)", "nacional": false}, {"text": "Istambul, Turquia, Todos os Aeroportos (IST)", "nacional": false}, {"text": "Itaituba - PA, Brasil (ITB)", "nacional": true}, {"text": "Jerusalem - Atarot(JRS)", "nacional": false}, {"text": "Ji-Parana - RO, Brasil, Jose Coleto (JPR)", "nacional": true}, {"text": "Joacaba - SC, Brasil, Santa Terezinha (JCB)", "nacional": true}, {"text": "Joao Pessoa - PB, Brasil, Presidente Castro Pinto (JPA)", "nacional": true}, {"text": "Johanesburgo, africa do Sul, OR Tambo (JNB)", "nacional": false}, {"text": "Joinville - SC, Brasil, Lauro Carneiro de Loyola (JOI)", "nacional": true}, {"text": "Juazeiro do Norte - CE, Brasil, Orlando Bezerra de Meneses (JDO)", "nacional": true}, {"text": "Kingston, Jamaica, Norman Manley (KIN)", "nacional": false}, {"text": "Labrea - AM, Brasil (LBR)", "nacional": true}, {"text": "La Paz, Bolivia, El Alto (LPB)", "nacional": false}, {"text": "Las Vegas - NV, Estados Unidos, McCarran (LAS)", "nacional": false}, {"text": "LAX", "nacional": false}, {"text": "Lima, Peru, Jorge Chavez (LIM)", "nacional": false}, {"text": "Lisboa, Portugal, Portela (LIS)", "nacional": false}, {"text": "London - England - Heathrow Airport(LHR)", "nacional": false}, {"text": "Londres - Aeroporto London Heathrow(LHR)", "nacional": false}, {"text": "Londres, Inglaterra, Heathrow (LHR)", "nacional": false}, {"text": "Londres, Inglaterra, London City (LCY)", "nacional": false}, {"text": "Londres, Inglaterra, Stansted (STN)", "nacional": false}, {"text": "Londres, Inglaterra, Todos os Aeroportos (LON)", "nacional": false}, {"text": "Los Angeles - CA - Aeroporto Los Angeles(LAX)", "nacional": false}, {"text": "Los Angeles - CA, Estados Unidos (LAX)", "nacional": false}, {"text": "Luanda, Angola, Quatro de Fevereiro (LAD)", "nacional": false}, {"text": "Luxemburgo, Luxemburgo, Findel (LUX)", "nacional": false}, {"text": "Lyon, Franca, Satolas (LYS)", "nacional": false}, {"text": "Macapa - AP, Brasil (MCP)", "nacional": true}, {"text": "Maceio - AL, Brasil, Zumbi dos Palmares (MCZ)", "nacional": true}, {"text": "Madri, Espanha, Barajas (MAD)", "nacional": false}, {"text": "Malaga, Espanha, Pablo Ruiz Picasso (AGP)", "nacional": false}, {"text": "Manaus - AM, Brasil, Eduardo Gomes (MAO)", "nacional": true}, {"text": "Manchester, Inglaterra (MAN)", "nacional": false}, {"text": "Maputo, Mocambique (MPM)", "nacional": false}, {"text": "Maraba - PA, Brasil (MAB)", "nacional": true}, {"text": "Marilia - SP, Brasil, Frank Miloye Milenkovich (MII)", "nacional": true}, {"text": "Maringa - PR, Brasil, Silvio Name Junior (MGF)", "nacional": true}, {"text": "Marselha, Franca, Marseille-Marignane (MRS)", "nacional": false}, {"text": "Medellin, Colombia, Jose Maria Cordova (MDE)", "nacional": false}, {"text": "Melbourne - VIC, Australia, Todos os Aeroportos (MEL)", "nacional": false}, {"text": "Mendoza, Argentina, El Plumerillo (MDZ)", "nacional": false}, {"text": "Milan - Linate (LIN)", "nacional": false}, {"text": "Milan - Malpensa (MXP)", "nacional": false}, {"text": "Mil\\u00e3o - It\\u00e1lia - Aeroporto Linate(LIN)", "nacional": false}, {"text": "Mil\\u00e3o - It\\u00e1lia - Aeroporto Malpensa(MXP)", "nacional": false}, {"text": "Milao, Italia, Malpensa (MXP)", "nacional": false}, {"text": "Minneapolis-St. Paul - MN, Estados Unidos (MSP)", "nacional": false}, {"text": "Montes Claros - MG, Brasil, Mario Ribeiro (MOC)", "nacional": true}, {"text": "Montevideu, Uruguai, Carrasco (MVD)", "nacional": false}, {"text": "Montreal - QC, Canada, Montreal-Dorval (YUL)", "nacional": false}, {"text": "Moscou, Russia, Bykovo (BKA)", "nacional": false}, {"text": "Moscou, Russia, Domodedovo International (DME)", "nacional": false}, {"text": "Moscou, Russia, Sheremetyevo International (SVO)", "nacional": false}, {"text": "Moscou, Russia, Todos os aeroportos (MOW)", "nacional": false}, {"text": "Mossoro - RN, Brasil (MVF)", "nacional": true}, {"text": "Muenchen - Franz Josef Strauss(MUC)", "nacional": false}, {"text": "Munique, Alemanha, Franz Josef Strauss (MUC)", "nacional": false}, {"text": "Munique - Munich - Franz Josef Strauss(MUC)", "nacional": false}, {"text": "Nagoya, Japao, Komaki (NKM)", "nacional": false}, {"text": "Nagoya, Japao, Todos os Aeroportos (NGO)", "nacional": false}, {"text": "Napoles, Italia, Capodichino (NAP)", "nacional": false}, {"text": "Natal - RN, Brasil, Aeroporto Internacional Aluízio Alves em São Gonçalo do Amarante (NAT)", "nacional": true}, {"text": "Navegantes - SC, Brasil, Ministro Victor Konder (NVT)", "nacional": true}, {"text": "Newark Liberty International Airport (EWR)", "nacional": false}, {"text": "New York - NY - Aeroporto Newark Liberty(EWR)", "nacional": false}, {"text": "Nice, Franca, Cote d 'Azur (NCE)", "nacional": false}, {"text": "Nova Iorque - NY, Estados Unidos, John F. Kennedy International (JFK)", "nacional": false}, {"text": "Nova Iorque - NY, Estados Unidos, Newark International (EWR)", "nacional": false}, {"text": "Nova Iorque - NY, Estados Unidos, Todos os aeroportos (NYC)", "nacional": false}, {"text": "Nova Orleans - LA, Estados Unidos, Louis Armstrong (MSY)", "nacional": false}, {"text": "Orlando - FL - Executive Airport(ORL)", "nacional": false}, {"text": "Orlando - FL - Orlando International Airport(MCO)", "nacional": false}, {"text": "Osaka - Itami Airport(ITM)", "nacional": false}, {"text": "Osaka - Kansai Airport(KIX)", "nacional": false}, {"text": "Osaka - Todos os aeroportos(OSA)", "nacional": false}, {"text": "Oslo - Gardermoen(GEN)", "nacional": false}, {"text": "Oslo - Todos os aeroportos(OSL)", "nacional": false}, {"text": "Ottawa - ON - Macdonald-Cartier International Airport(YOW)", "nacional": false}, {"text": "Palmas - TO, Brasil, Brigadeiro Lysias Rodrigues (PMW)", "nacional": true}, {"text": "Parintins - AM, Brasil, Julio Belem (PIN)", "nacional": true}, {"text": "Paris, Franca, Charles de Gaulle (CDG)", "nacional": false}, {"text": "Paris, Franca, Orly (ORY)", "nacional": false}, {"text": "Paris, Franca, Todos os aeroportos (PAR)", "nacional": false}, {"text": "Passo Fundo - RS, Brasil, Lauro Kurtz (PFB)", "nacional": true}, {"text": "Patos de Minas - MG, Brasil, Pedro Pereira dos Santos (POJ)", "nacional": false}, {"text": "Pelotas - RS, Brasil (PET)", "nacional": true}, {"text": "Pequim, China (PEK)", "nacional": false}, {"text": "Petrolina - PE, Brasil, Senador Nilo Coelho (PNZ)", "nacional": true}, {"text": "Phoenix - AZ, Estados Unidos, Sky Harbor (PHX)", "nacional": false}, {"text": "Portland - ME, Estados Unidos (PWM)", "nacional": false}, {"text": "Portland - OR, Estados Unidos (PDX)", "nacional": false}, {"text": "Porto Alegre - RS, Brasil, Salgado Filho (POA)", "nacional": true}, {"text": "Porto, Portugal, Francisco Sa Carneiro (OPO)", "nacional": false}, {"text": "Porto Seguro  - BA, Brasil (BPS)", "nacional": true}, {"text": "Porto Trombetas - PA, Brasil (TMT)", "nacional": false}, {"text": "Praga - Aeroporto Prague-Ruzyne(PRG)", "nacional": false}, {"text": "Praga, Republica Tcheca, Ruzyne (PRG)", "nacional": false}, {"text": "Punta Cana - Republica Dominicana(PUJ)", "nacional": false}, {"text": "Punta Cana, Republica Dominicana (PUJ)", "nacional": false}, {"text": "Punta Cana - Todos os aeroportos(PUJ)", "nacional": false}, {"text": "Punta del Este, Uruguai, Carlos A. Curbelo (PDP)", "nacional": false}, {"text": "Quebec - QC, Canada, Jean Lesage (YQB)", "nacional": false}, {"text": "Quito, Equador, Mariscal Sucre (UIO)", "nacional": false}, {"text": "Recife - PE, Brasil, Guararapes (REC)", "nacional": true}, {"text": "Reno - NV, Estados Unidos, Reno-Tahoe (RNO)", "nacional": false}, {"text": "Ribeirao Preto - SP, Brasil, Leite Lopes (RAO)", "nacional": true}, {"text": "Rio Branco - AC, Brasil, Placido de Castro (RBR)", "nacional": true}, {"text": "Rio de Janeiro - RJ, Brasil, Galeao (GIG)", "nacional": true}, {"text": "Rio de Janeiro - RJ, Brasil, Santos Dumont (SDU)", "nacional": true}, {"text": "Rio de Janeiro - RJ, Brasil, Todos os aeroportos (RIO)", "nacional": true}, {"text": "Rio Verde - GO, Brasil, General Leite de Castro (RVD)", "nacional": true}, {"text": "Roma, Italia, Leonardo da Vinci-Fiumicino (FCO)", "nacional": false}, {"text": "Rondonopolis - MT, Brasil, Maestro Marinho Franco (ROO)", "nacional": true}, {"text": "Saint Louis - MO, Estados Unidos, Lambert-St. Louis (STL)", "nacional": false}, {"text": "Salt Lake City - UT, Estados Unidos (SLC)", "nacional": false}, {"text": "Salvador - BA, Brasil, Deputado Luis Eduardo Magalhaes (SSA)", "nacional": true}, {"text": "San Andres, Colombia, Sesquicentenario (ADZ)", "nacional": false}, {"text": "San Diego - CA, Estados Unidos (SAN)", "nacional": false}, {"text": "San Francisco - CA, Estados Unidos (SFO)", "nacional": false}, {"text": "San Jose - CA, Estados Unidos, Norman Y. Mineta San Jose (SJC)", "nacional": false}, {"text": "San Jose, Costa Rica, Juan Santamaria (SJO)", "nacional": false}, {"text": "San Juan, Porto Rico, Luis Munoz Marin (SJU)", "nacional": false}, {"text": "San Salvador, El Salvador, Comalapa (SAL)", "nacional": false}, {"text": "Santa Cruz de la Sierra, Bolivia, Todos os Aeroportos (SRZ)", "nacional": false}, {"text": "Santa Cruz de la Sierra, Bolivia, Viru Viru International (VVI)", "nacional": false}, {"text": "Santa Isabel do Rio Negro - AM, Brasil, Tapuruquara (TPU)", "nacional": true}, {"text": "Santa Maria - RS, Brasil (RIA)", "nacional": true}, {"text": "Santarem - PA, Brasil, Maestro Wilson Fonseca (STM)", "nacional": true}, {"text": "Santiago, Chile, Comodoro Arturo Merino Benitez (SCL)", "nacional": false}, {"text": "Santiago de Compostela, Espanha, Lavacolla (SCQ)", "nacional": false}, {"text": "Santo angelo - RS, Brasil, Sepe Tiaraju (GEL)", "nacional": true}, {"text": "Santo Domingo - Aeropuerto de las Americas(SDQ)", "nacional": false}, {"text": "Sao Gabriel da Cachoeira - AM, Brasil (SJL)", "nacional": true}, {"text": "Sao Jose do Rio Preto - SP, Brasil, Professor Eribelto Manoel Reino (SJP)", "nacional": true}, {"text": "Sao Jose dos Campos - SP, Brasil, Professor Urbano Ernesto Stumpf (SJK)", "nacional": true}, {"text": "Sao Paulo - Campinas - SP, Brasil, Viracopos (VCP)", "nacional": true}, {"text": "Sao Paulo de Olivenca - AM, Brasil, Senadora Eunice Micheles (SPO)", "nacional": true}, {"text": "Sao Paulo - Guarulhos - SP, Brasil (GRU)", "nacional": true}, {"text": "Sao Paulo - SP, Brasil, Congonhas (CGH)", "nacional": true}, {"text": "Sao Paulo - SP, Brasil, Todos os aeroportos (SAO)", "nacional": true}, {"text": "Seoul - Aeroporto Incheon(ICN)", "nacional": false}, {"text": "Seoul - Aeroporto Internacional Gimpo(GMP)", "nacional": false}, {"text": "Seul, Coreia do Sul, Incheon International (ICN)", "nacional": false}, {"text": "Seul, Coreia do Sul, Todos os aeroportos (SEL)", "nacional": false}, {"text": "Sevilha, Espanha, San Pablo (SVQ)", "nacional": false}, {"text": "Singapore - Changi International Airport(SIN)", "nacional": false}, {"text": "Sinop - MT, Brasil (OPS)", "nacional": true}, {"text": "Stockholm - Arlanda(ARN)", "nacional": false}, {"text": "Stuttgart, Alemanha, Echterdingen (STR)", "nacional": false}, {"text": "Sydney - NSW, Australia, Kingsford Smith (SYD)", "nacional": false}, {"text": "Tabatinga - AM, Brasil (TBT)", "nacional": true}, {"text": "Tampa - FL, Estados Unidos (TPA)", "nacional": false}, {"text": "Tefe - AM, Brasil (TFF)", "nacional": true}, {"text": "Tel Aviv, Israel, Ben Gurion (TLV)", "nacional": false}, {"text": "Teresina - PI, Brasil, Senador Petronio Portella (THE)", "nacional": true}, {"text": "Toquio, Japao, Haneda (HND)", "nacional": false}, {"text": "Toquio, Japao, Narita International (NRT)", "nacional": false}, {"text": "Toquio, Japao, Todos os aeroportos (TYO)", "nacional": false}, {"text": "Toronto - ON, Canada, Todos os aeroportos (YTO)", "nacional": false}, {"text": "Toronto - ON, Canada, Toronto City Centre (YTZ)", "nacional": false}, {"text": "Toronto - ON, Canada, Toronto Pearson International (YYZ)", "nacional": false}, {"text": "Toulouse, Franca, Toulouse-Blagnac (TLS)", "nacional": false}, {"text": "Tucurui - PA, Brasil (TUR)", "nacional": true}, {"text": "Turim, Italia (TRN)", "nacional": false}, {"text": "Uberaba - MG, Brasil, Mario de Almeida Franco (UBA)", "nacional": true}, {"text": "Uberlandia - MG, Brasil (UDI)", "nacional": true}, {"text": "Uruguaiana - RS, Brasil, Rubem Berta (URG)", "nacional": true}, {"text": "Ushuaia, Argentina, Ushuaia-Malvinas Argentinas (USH)", "nacional": false}, {"text": "Valencia, Espanha (VLC)", "nacional": false}, {"text": "Vancouver - BC, Canada (YVR)", "nacional": false}, {"text": "Varginha - MG, Brasil (VAG)", "nacional": true}, {"text": "Varsovia, Polonia, Okecie (WAW)", "nacional": false}, {"text": "Veneza, Italia, Venice Marco Polo (VCE)", "nacional": false}, {"text": "Viena - Aeroporto Schwechat(VIE)", "nacional": false}, {"text": "Viena, Austria (VIE)", "nacional": false}, {"text": "Vienna - Schwechat(VIE)", "nacional": false}, {"text": "Vigo, Espanha, Vigo-Peinador (VGO)", "nacional": false}, {"text": "Vitoria da Conquista - BA, Brasil (VDC)", "nacional": true}, {"text": "Vitoria - ES, Brasil, Eurico de Aguiar Salles (VIX)", "nacional": true}, {"text": "Washington - DC, Estados Unidos, Dulles International (IAD)", "nacional": false}, {"text": "Washington - DC, Estados Unidos, Ronald Reagan (DCA)", "nacional": false}, {"text": "Washington - DC, Estados Unidos, Todos os aeroportos (WAS)", "nacional": false}, {"text": "Xangai, China, Pudong International (PVG)", "nacional": false}, {"text": "Zurich - Zurich-Kloten(ZRH)", "nacional": false}, {"text": "Zurique - Aeroporto Zurich-Kloten(ZRH)", "nacional": false}, {"text": "Zurique, Suica (ZRH)", "nacional": false}, {"text": "Caldas Novas - GO, Brasil, Airport (CLV)", "nacional": true}, {"text": "Ipatinga - MG, Brasil, Usiminas (IPN)", "nacional": true}, {"text": "Juiz de Fora - MG, Brasil, Zona da Mata (IZA)", "nacional": true}, {"text": "Presidente Prudente - SP, Brasil, Adhemar de Barros (PPB)", "nacional": true}, {"text": "Altamira - PA, Brasil, Altamira (ATM)", "nacional": true},{"text":"Aeroporto Son Sant Joan, Palma de Maiorca, Espanha (PMI)","nacional": false}, {"text": "Buzios - RJ, Brasil, Aeroporto Umberto Mediano (BZC)", "nacional": true}, {"text": "Cacoal - RO, Brasil, Aeroporto de Cacoal (OAL)", "nacional": true}];

        FormularioPesquisaRodoviarioEmitir.init({
            'url_base': this.url_base,
            'container': this.$formulario_rodoviario
        });
    }
    FormularioPesquisaEmitir.init = function(param){

        FormularioPesquisaEmitir._instance = new FormularioPesquisaEmitir(param);
        return FormularioPesquisaEmitir._instance.init();
    };
    FormularioPesquisaEmitir.prototype.init = function(){
        this.load_events();
    };
    FormularioPesquisaEmitir.prototype.load_events = function(){
        var self = this;
        if (typeof(self.$container.attr('iframe')) != "undefined"){
            if (self.$container.attr('iframe') == "1"){
                self.iframe = true;
            }
            else{
                self.iframe = false;
            }
        }
        else{
            self.iframe = false;
        }
        self.load_datepickers();
        self.load_autocompletes();

        self.$container.tabs();

        self.$container.find('input[name=tipo_viagem]').change(function(){
            if (this.value == "somente_ida") {
                self.$container.find('[data_volta]').attr('disabled', 'disabled');
            } else {
                self.$container.find('[data_volta]').removeAttr('disabled');
            }
        });

        self.$formulario_aereo.find('[btn_pesquisar]').click(function(event){
            var new_window,
                url;
            event.preventDefault();
            if (!self.validate_form_aereo()) {
                return false;
            }

            url = self.get_url_pesquisa_aereo();

            if(typeof self.callback_pesquisar == 'function') {
                self.callback_pesquisar(url);
            } else {
                if (self.iframe){
                    location.href = url;
                } else {
                    new_window = window.open(url, '_blank');
                    new_window.focus();
                }
            }
        });

        self.$formulario_hotel.find('[btn_pesquisar]').click(function(event){
            var new_window,
                url;
            event.preventDefault();
            if (!self.validate_form_hotel()) {
                return false;
            }
            url = self.get_url_pesquisa_hotel();
            if(typeof self.callback_pesquisar == 'function') {
                self.callback_pesquisar(url);
            } else {
                if (self.iframe){
                    location.href = url;
                }
                else{
                    new_window = window.open(url, '_blank');
                    new_window.focus();
                }
            }
        });

        self.$formulario_aereo_hotel.find('[btn_pesquisar]').click(function(event){
            var new_window,
                url;
            event.preventDefault();
            if (!self.validate_form_aereo_hotel()) {
                return false;
            }
            url = self.get_url_pesquisa_aereo_hotel();
            if(typeof self.callback_pesquisar == 'function') {
                self.callback_pesquisar(url);
            } else {
                if (self.iframe){
                    location.href = url;
                }
                else{
                    new_window = window.open(url, '_blank');
                    new_window.focus();
                }
            }
        });

        self.$formulario_hotel.find('[quantidade_quartos]').click(function(){
            var quarto = self.$formulario_hotel.find('[quarto_template]').html(),
                quantidade = this.value,
                container = self.$formulario_hotel.find('[quartos]');
            quartos = self.$formulario_hotel.find('[quarto]:visible');
            if (quantidade > quartos.length) {
                for (var i=quartos.length; i < quantidade; i++) {
                    container.append(quarto);
                }
            } else if (quantidade != quartos.length){
                container.html(quartos.slice(0, quantidade));
            }
            self.load_events_quarto();
        });
        // Inicializamos com um quarto
        self.$formulario_hotel.find('[quartos]').append(
            self.$formulario_hotel.find('[quarto_template]').html()
        );
        self.load_events_quarto();


        self.$formulario_aereo_hotel.find('[quantidade_quartos]').click(function(){
            var quarto = self.$formulario_aereo_hotel.find('[quarto_template]').html(),
                quantidade = this.value,
                container = self.$formulario_aereo_hotel.find('[quartos]');
            quartos = self.$formulario_aereo_hotel.find('[quarto]:visible');
            if (quantidade > quartos.length) {
                for (var i=quartos.length; i < quantidade; i++) {
                    container.append(quarto);
                }
            } else if (quantidade != quartos.length){
                container.html(quartos.slice(0, quantidade));
            }
            self.load_events_quarto();
        });
        // Inicializamos com um quarto
        self.$formulario_aereo_hotel.find('[quartos]').append(
            self.$formulario_aereo_hotel.find('[quarto_template]').html()
        );
        self.load_events_quarto();
    };
    FormularioPesquisaEmitir.prototype.load_events_quarto = function(){
        var self = this;
        self.$formulario_hotel.find('[quantidade_criancas]').bind('click', function(){
            var quantidade = this.value,
                $quarto = $($(this).parent().parent());
                idades = $quarto.find('[idade_crianca]:visible'),
                container = $quarto.find('[idades_criancas]'),
                idade = self.$formulario_hotel.find('[idade_crianca_template]').html();
            if (quantidade > idades.length) {
                for (var i=idades.length; i < quantidade; i++) {
                    container.append(idade);
                }
            } else {
                container.html(idades.slice(0, quantidade));
            }
        });

        var self = this;
        self.$formulario_aereo_hotel.find('[quantidade_criancas]').bind('click', function(){
            var quantidade = this.value,
                $quarto = $($(this).parent().parent());
                idades = $quarto.find('[idade_crianca]:visible'),
                container = $quarto.find('[idades_criancas]'),
                idade = self.$formulario_aereo_hotel.find('[idade_crianca_template]').html();
            if (quantidade > idades.length) {
                for (var i=idades.length; i < quantidade; i++) {
                    container.append(idade);
                }
            } else {
                container.html(idades.slice(0, quantidade));
            }
        });
    };

    FormularioPesquisaEmitir.prototype.load_datepickers = function(){
        var self = this;
        this.$container.find('[widget=datepicker]').each(function(){
            var $input =$(this),
                $related_input = $($input.attr('related'));

            $(this).datepicker({
                minDate: self.antecedencia_minima,
                dateFormat: "dd/mm/yy",
                changeMonth: false,
                numberOfMonths: 1,
                onSelect: function( selectedDate ) {
                    var periodo_minimo = 0,
                        min_date,
                        date;

                    if ($related_input) {
                        if (typeof($related_input.attr('data_saida')) != "undefined") {
                            periodo_minimo = 1;
                        }
                        date = selectedDate.split('index.html'),
                        min_date = new Date(date[2], date[1] - 1, date[0]),
                        min_date = new Date(min_date.setDate(min_date.getDate() + periodo_minimo));

                        $($related_input).datepicker("option", "minDate", min_date);
                        $($related_input).datepicker("setDate", min_date);
                    }
                }
            });
        });
        FormularioPesquisaEmitir.load_datepicker_configs();
    };

    FormularioPesquisaEmitir.prototype.load_autocompletes = function(){
        var self = this;

        this.$formulario_aereo.find('[origem], [destino]').each(function(){
            var $input = $(this);
            $(this).autocomplete({
                minLength: 3,
                source: function(request, callback){
                    var texto = FrameEmitirUtils.StringUtils.remover_acentos(request.term).toLowerCase();
                    resultado = $.grep(self.aeroportos, function(registro) {
                        return registro.text.toLowerCase().indexOf(texto) != -1;
                    });

                    var response = [];
                    $.each(resultado, function(a, obj) {
                        if ($input.attr("origem") == "1" && !self.origem_internacional && !obj.nacional) {
                            return
                        }
                        response.push(obj.text);
                    });

                    callback(response)
                },
                change: function(event, ui){
                    if (ui.item){
                        if($(this).val() === ui.item.value){
                            $(this).attr('selecionado','1');
                        }
                    }
                }
            });
        });

        this.$formulario_hotel.find('[destino]').each(function(){
            var $input =$(this);
            $(this).autocomplete({
                delay: 500,
                minLength: 3,
                source: function(request, callback){
                    var texto = FrameEmitirUtils.StringUtils.remover_acentos(request.term).toLowerCase();
                    if (typeof(self.cidades[texto]) === "undefined") {
                        self._callback_autocomplete_hotel = function(data){
                            var cidades = $.parseJSON(data);
                            callback(cidades);
                            self.cidades[texto] = cidades;
                        };
                        $.ajax({
                            url: self.server_url + 'get_cidades',
                            type: 'GET',
                            data: {'cidade': texto},
                            dataType: 'jsonp',
                            cache: true,
                            jsonpCallback: 'FormularioPesquisaEmitir._instance._callback_autocomplete_hotel'
                        });
                    } else {
                        callback(self.cidades[texto]);
                    }
                }
            });
        });

        this.$formulario_aereo_hotel.find('[origem], [destino]').each(function(){
            var $input =$(this);
            $(this).autocomplete({
                delay: 500,
                minLength: 3,
                source: function(request, callback){
                    var texto = FrameEmitirUtils.StringUtils.remover_acentos(request.term).toLowerCase();
                    if (typeof(self.cidades[texto]) === "undefined") {
                        self._callback_autocomplete_hotel = function(data){
                            var cidades = $.parseJSON(data);
                            callback(cidades);
                            self.cidades[texto] = cidades;
                        };
                        $.ajax({
                            url: self.server_url + 'get_cidades',
                            type: 'GET',
                            data: {'cidade': texto},
                            dataType: 'jsonp',
                            cache: true,
                            jsonpCallback: 'FormularioPesquisaEmitir._instance._callback_autocomplete_hotel'
                        });
                    } else {
                        callback(self.cidades[texto]);
                    }
                }
            });
        });
    };

    FormularioPesquisaEmitir.prototype.validate_form_aereo = function(){
//        var self = this,
//            valid = true,
//            output = '',
//            origem = this.$formulario_aereo.find('[origem]:visible').val(),
//            destino = this.$formulario_aereo.find('[destino]:visible').val();
//        // Validando se foi selecionada uma das opcoes do autocomplete
//        this.$formulario_aereo.find('[origem]:visible, [destino]:visible').each(function(){
//            if (!$(this).attr('selecionado')){
//                valid = false;
//                output += $(this).attr('required_message') + "\n";
//            }
//        });
//        // validando se o aeroporto de origem e destino sao diferentes
//        if(origem === destino){
//            valid = false;
//            output += "Os aeropotos de origem e destino precisam ser diferentes." + "\n";
//        }
//        this.$formulario_aereo.find('[data_ida]:visible').each(function(){
//            if (this.value == '') {
//                valid = false;
//                output += $(this).attr('required_message') + "\n";
//            }
//        });
//        if (this.$formulario_aereo.find('input[name=tipo_viagem]:checked').val() == 'ida_e_volta') {
//            this.$formulario_aereo.find('[data_volta]').each(function(){
//                if (this.value == '') {
//                    valid = false;
//                    output += $(this).attr('required_message') + "\n";
//                }
//            });
//        }
//        if (!valid){
//            alert(output)
//        }
//        return valid;
    };
    FormularioPesquisaEmitir.prototype.validate_form_hotel = function(){
        var self = this,
            valid = true,
            output = '';
        this.$formulario_hotel.find('[destino], [data_entrada], [data_saida]').each(function(){
            if (this.value == '') {
                valid = false;
                output += $(this).attr('required_message') + "\n";
            }
        });
        if (!valid){
            alert(output)
        }
        return valid;
    };
    FormularioPesquisaEmitir.prototype.validate_form_aereo_hotel = function(){
        var self = this,
            valid = true,
            output = '';
        this.$formulario_aereo_hotel.find('[origem], [destino], [data_entrada], [data_saida]').each(function(){
            if (this.value == '') {
                valid = false;
                output += $(this).attr('required_message') + "\n";
            }
        });
        if (!valid){
            alert(output)
        }
        return valid;
    };

    FormularioPesquisaEmitir.prototype.get_url_pesquisa_aereo = function(){
        var self = this,
            partes = []
            form = this.$formulario_aereo;

        // Origem e destino tem um padrÃƒÂ£o ANSI para ser passado nas URLs, daÃƒÂ­
        // entra tambÃƒÂ©m o URLEncode
        partes.push(encodeURI(form.find('[origem]:visible').val()));
        partes.push(encodeURI(form.find('[destino]:visible').val()));

        partes.push(form.find('[data_ida]:visible').val().replace(/\//g, "-"))

        // Considera a data de volta apenas se for voo ida e volta
        if (form.find('input[name=tipo_viagem]:checked').val() == 'ida_e_volta') {
            partes.push(form.find('[data_volta]:visible').val().replace(/\//g, "-"))
        }

        partes.push(form.find('[quantidade_adultos]:visible').val())
        partes.push(form.find('[quantidade_criancas]:visible').val())
        partes.push(form.find('[quantidade_bebes]:visible').val())

        url = self.url_base + 'site/aereo/pesquisa/' + partes.join("index.html");

        return url;
    };
    FormularioPesquisaEmitir.prototype.get_url_pesquisa_hotel = function(){
        var self = this,
            partes = []
            form = this.$formulario_hotel,
            quartos = form.find('[quarto]:visible'),
            tipo_quarto = {
                '1': 'SGL',
                '2': 'DBL',
                '3': 'TPL',
                '4': 'QPL'
            };

        // Origem e destino tem um padrÃƒÂ£o ANSI para ser passado nas URLs, daÃƒÂ­
        // entra tambÃƒÂ©m o URLEncode
        partes.push(encodeURI(form.find('[destino]').val()));

        partes.push(form.find('[data_entrada]').val().replace(/\//g, "-"))
        partes.push(form.find('[data_saida]').val().replace(/\//g, "-"))

        quartos.each(function(){
            var $quarto = $(this),
                adultos = $quarto.find('[quantidade_adultos]').val(),
                $idades = $quarto.find('[idade_crianca]:visible');
            partes.push(tipo_quarto[adultos]);

            $idades.each(function(){
                partes.push(this.value);
            });
            for (var i = $idades.length; i < 3; i++) {
                partes.push('-');
            }
        });

        url = self.url_base + 'site/hotel/pesquisa/' + partes.join("index.html") + '/';
        return url;
    };
    FormularioPesquisaEmitir.prototype.get_url_pesquisa_aereo_hotel = function(){
        var self = this,
            partes = []
            form = this.$formulario_aereo_hotel,
            quartos = form.find('[quarto]:visible'),
            tipo_quarto = {
                '1': 'SGL',
                '2': 'DBL',
                '3': 'TPL',
                '4': 'QPL'
            };

        // Origem e destino tem um padrÃƒÂ£o ANSI para ser passado nas URLs, daÃƒÂ­
        // entra tambÃƒÂ©m o URLEncode
        partes.push(encodeURI(form.find('[origem]').val()));
        partes.push(encodeURI(form.find('[destino]').val()));

        partes.push(form.find('[data_entrada]').val().replace(/\//g, "-"))
        partes.push(form.find('[data_saida]').val().replace(/\//g, "-"))

        quartos.each(function(){
            var $quarto = $(this),
                adultos = $quarto.find('[quantidade_adultos]').val(),
                $idades = $quarto.find('[idade_crianca]:visible');
            partes.push(tipo_quarto[adultos]);

            $idades.each(function(){
                partes.push(this.value);
            });
            for (var i = $idades.length; i < 3; i++) {
                partes.push('-');
            }
        });

        url = self.url_base + 'site/aereo_hotel/pesquisa/' + partes.join("index.html");

        return url;
    };

    FormularioPesquisaEmitir.load_datepicker_configs = function(){
        if (typeof($.datepicker) != "undefined") {
            $.datepicker.regional['pt-BR'] = {
                closeText: 'Fechar',
                prevText: '&#x3c;Anterior',
                nextText: 'Pr&oacute;ximo&#x3e;',
                currentText: 'Hoje',
                monthNames: ['Janeiro','Fevereiro','Mar&ccedil;o','Abril','Maio','Junho',
                'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
                monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun',
                'Jul','Ago','Set','Out','Nov','Dez'],
                dayNames: ['Domingo','Segunda-feira','Ter&ccedil;a-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sabado'],
                dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
                dayNamesMin: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
                weekHeader: 'Sm',
                dateFormat: 'dd/mm/yy',
                firstDay: 0,
                isRTL: false,
                showMonthAfterYear: false,
                yearSuffix: ''
            };
            $.datepicker.setDefaults($.datepicker.regional['pt-BR']);
        }
    };

    return FormularioPesquisaEmitir;
})(jQuery);


$(document).ready(function(){
    if (typeof($) === "undefined" && typeof(jQuery) != "undefined") {
        var $ = jQuery;
    }
    FormularioPesquisaEmitir.load_datepicker_configs();
});
