<%@page import="org.apache.jasper.tagplugins.jstl.ForEach"%>
<%@page import="br.passagens.Bean.VooBean"%>
<%@page import="br.passagens.DAO.AeroportoDAO"%>
<%@page import="br.passagens.Bean.AeroportoBean"%>
<%@page import="java.util.List"%>
<!DOCTYPE html>
<html lang="pt-br" prefix="og: http://ogp.me/ns#" class="multisites">
<meta http-equiv="content-type" content="text/html;charset=UTF-8" />
<head>
    <meta charset="UTF-8">
    <title>Passagens aéreas - Toledo!</title>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
    <link rel="stylesheet" href="assets/vendor/bootstrap/dist/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="assets/vendor/bootstrap/dist/css/bootstrap-theme.min.css"/>
    <link rel="stylesheet" type="text/css" href="assets/css/colorbox/colorbox.css">
    <link rel="stylesheet" href="assets/css/jquery.bxslider.min.css"/>
    <link rel="stylesheet" href="assets/css/font-awesome.min.css"/>
    <link rel="stylesheet" href="assets/css/main.css"/>
    <!-- essencial -->
    <script src="assets/vendor/jquery/dist/jquery.min.js"></script>
    <script src="assets/vendor/bootstrap/dist/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="assets/js/jquery.cookie.js"></script>
    <script type="text/javascript" src="assets/js/jquery.colorbox-min.js"></script>
    <script type="text/javascript" src="assets/js/jquery.ddslick.min.js"></script>
    <script type="text/javascript" src="assets/js/jquery.bxslider.min.js"></script>
    <script type="text/javascript" src="assets/js/angular.min.js"></script>
    <script type="text/javascript" src="assets/js/mask.min.js"></script>
    <script type="text/javascript" src="assets/js/ngCpfCnpj.js"></script>



    <link rel="stylesheet"  href="assets/css/bootstrap-datepicker.min.css" />
     <script type="text/javascript" src="assets/js/bootstrap-datepicker.js"></script>
     <script type="text/javascript" src="assets/js/bootstrap-datepicker.js"></script>     
     <script type="text/javascript" src="assets/js/bootstrap-datepicker.pt-BR.min.js"></script>



<meta name="description" content="Passagens Aéreas Promocionais."/>
<meta name="robots" content="noodp"/>

<style type="text/css">
img.wp-smiley,
img.emoji {
	display: inline !important;
	border: none !important;
	box-shadow: none !important;
	height: 1em !important;
	width: 1em !important;
	margin: 0 .07em !important;
	vertical-align: -0.1em !important;
	background: none !important;
	padding: 0 !important;
}
</style>
<link rel='stylesheet' id='validate-engine-css-css'  href='assets/plugins/wysija-newsletters/css/validationEngine.jquery653d.css?ver=2.7.1' type='text/css' media='all' />
<link rel='stylesheet' id='stylesheet-css'  href='assets/plugins/contact-bank/assets/css/stylesheet3428.css?ver=4.5.2' type='text/css' media='all' />
<link rel='stylesheet' id='system-message-css'  href='assets/plugins/contact-bank/assets/css/system-message3428.css?ver=4.5.2' type='text/css' media='all' />
<link rel='stylesheet' id='wp-polls-css'  href='assets/plugins/wp-polls/polls-css1b5e.css?ver=2.73' type='text/css' media='all' />
<style id='wp-polls-inline-css' type='text/css'>
.wp-polls .pollbar {
	margin: 1px;
	font-size: 6px;
	line-height: 8px;
	height: 8px;
	background-image: url('assets/plugins/wp-polls/images/default/pollbg.gif');
	border: 1px solid #c8c8c8;
}

</style>
<link rel='stylesheet' id='bos_sb_main_css-css'  href='assets/plugins/bookingcom-official-searchbox/css/bos_searchboxad05.css?ver=1.4' type='text/css' media='all' />
<script type='text/javascript' src='assets/plugins/jquerycad0.js?ver=1.12.3'></script>
<script type='text/javascript' src='assets/plugins/jquery-migrate.min2fca.js?ver=1.4.0'></script>
<script type='text/javascript' src='assets/plugins/contact-bank/assets/js/jquery.Tooltip3428.js?ver=4.5.2'></script>
<script type='text/javascript' src='assets/plugins/contact-bank/assets/js/jquery.validate.min3428.js?ver=4.5.2'></script>
<link rel='https://api.w.org/' href='home/wp-json/index.html' />
<link rel="EditURI" type="application/rsd+xml" title="RSD" href="home/xmlrpc0db0.php?rsd" />
<link rel="wlwmanifest" type="application/wlwmanifest+xml" href="home/includes/wlwmanifest.xml" />
<meta name="generator" content="WordPress 4.5.2" />
<link rel="stylesheet" type="text/css" href="assets/plugins/microkids-related-posts/microkids-related-posts-default.css" />
<link href="assets/css/select2.min.css" rel="stylesheet" />

<style type="text/css">
.synved-social-resolution-single {
display: inline-block;
}
.synved-social-resolution-normal {
display: inline-block;
}
.synved-social-resolution-hidef {
display: none;
}

@media only screen and (min--moz-device-pixel-ratio: 2),
only screen and (-o-min-device-pixel-ratio: 2/1),
only screen and (-webkit-min-device-pixel-ratio: 2),
only screen and (min-device-pixel-ratio: 2),
only screen and (min-resolution: 2dppx),
only screen and (min-resolution: 192dpi) {
	.synved-social-resolution-normal {
	display: none;
	}
	.synved-social-resolution-hidef {
	display: inline-block;
	}
}
</style>
    <link rel="icon" href="assets/favicon.html" type="image/x-icon" />
    <link rel="shortcut icon" href="assets/ico/favicon.ico" type="image/x-icon" />
    <meta name="google-site-verification" content="nqONcIohmLjrc1sMqwkPYda_y8kYEOaemu_b5nlyQ1g" />
    <meta name="alexaVerifyID" content="FhM7poCgHNwp4OCkqaweEPZXago"/>
    <meta name="msvalidate.01" content="602BDF0539F685B655BA0D4ACE428767" />

</head>
<body class="home blog" >
<!-- change url -->
<div class="wrapper ">
    <!-- top-bar -->
    
    <!-- /top-bar -->
    <!-- header -->
    <% if(request.getParameter("msgcomprar") != null) { 
        out.print(request.getParameter("msgcomprar"));
    }                        
    %>
    <div class="row-fluid top-bar clearfix">
        <div class="container">
           
             <% 
              if(session.getAttribute("usuario") != null) {
             %>
            <form class="navbar-form pull-right" action="SrvCliente" method="POST">
                <button type="submit"name="btnSair" class="btn button-custom">Sair [x]</button>
            </form>
             <% } else { %>
            <form class="navbar-form navbar-right" action="SrvCliente" method="POST">
            <div class="form-group">
              <input type="text" placeholder="E-mail" name="email" class="form-control">
            </div>
            <div class="form-group">
              <input type="password" placeholder="Senha" name="senha" class="form-control">
            </div>
            <button type="submit"name="btnLogar" class="btn button-custom">Logar</button>
          </form>
            <% }  %>
             <h3 class="pull-right" style="color:white">
                <% 
                    if(session.getAttribute("usuario") != null) {
                        
                    
                %>
                 Olá <% out.print(session.getAttribute("usuario")); %>
                <%                         
                    } else {
                        session.setAttribute("mensagemlogin", null);
                    }
                %>
                
                <% 
                            if(session.getAttribute("mensagemlogin") !=null)
                            {
                                out.print(session.getAttribute("mensagemlogin"));
                                session.setAttribute("mensagemlogin", null);
                            }
                        %>
                        
                        <% 
                            if(session.getAttribute("msgerror") !=null)
                            {
                                out.print(session.getAttribute("msgerror"));
                                session.setAttribute("msgerror", null);
                            }
                        %>
            </h3>
             
    </div>    
    </div>

    <div class="row-fluid header clearfix">
        <div class="container">
            <div class="col-md-3 col-xs-8  col-md-offset-0 col-xs-offset-2">
                <div class="row-fluid container-logo">
                    <a name="logo" href="index.jsp">
                        <img src="assets/images/logo.png" alt="passagens promo" class="img-responsive" title="passagens promo"/>
                    </a>
                </div>
            </div>
            <div class="col-md-7 col-sm-12 col-xs-12">
                <div class="row menu ">
                    <nav class="navbar ">
                        <div class="row">

                            <!-- Brand and toggle get grouped for better mobile display -->
                            <div class="navbar-header">
                                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar1" aria-expanded="false">
                                    <span class="sr-only">Toggle navigation</span>
                                    <span class="icon-bar"></span>
                                    <span class="icon-bar"></span>
                                    <span class="icon-bar"></span>
                                </button>
                            </div>

                            <!-- Collect the nav links, forms, and other content for toggling -->
                            <div id="navbar1" class="collapse navbar-collapse"><ul id="menu-meu-menu" class="nav navbar-nav">
                              <li id="menu-item-2960" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2960">
                                  <a title="Passagens Aéreas" href="index.jsp">
                                      <span class="glyphicon Passagens Aéreas Promocionais"></span>
                                      &nbsp;Passagens Aéreas</a>
                              </li>
                              
                              <% 
                                    if(session.getAttribute("usuario") == null) {
                                %>
                             
                              <li id="menu-item-2960" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2960">
                                  <a title="Cadastrar" href="#" data-toggle="modal" data-target="#cadastrar">
                                      <span class="glyphicon Passagens Aéreas Promocionais"></span>
                                      Cadastre-se</a>
                              </li>
                              <% 
                                    }
                                %>
</ul></div>                        </div><!-- /.container-fluid -->
                    </nav>
                </div>
            </div>
            <div class="col-md-2 hidden-sm  hidden-xs">
                <div class="row menu">
                    <a href="#" target="_blank" class=" social twitter pull-right"><i class="fa fa-twitter-square"></i></a>
                    <a href="#" target="_blank" class="social googleplus pull-right"><i class="fa fa-google-plus-square"></i></a>
                    <a href="#" target="_blank" class="social facebook pull-right"><i class="fa fa-facebook-square"></i></a>
                </div>
            </div>
        </div>
    </div>
    <!-- /header -->

    <body>
         <!--Modal Cadastrar -->
<div class="container">
    <!-- Modal -->
    <div class="modal fade" id="cadastrar" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h1 class="modal-title">Cadastrar</h1>
                </div>
                <div class="modal-boy">
                    <form action="SrvCliente" id="formCadastrarPromocao" method="post">
                        <div class="col-sm-6">
                            <p class="contact-form-phone">
                                <label for="nome">Nome: <span class="required" aria-required="true">*</span></label>
                                <input required type="text" size="30" value="" name="nome" id="nome" class="form-control" placeholder="Nome">
                            </p>
                        </div>
                        <div class="col-sm-6">
                            <p class="contact-form-phone">
                                <label for="rg">CPF: <span class="required" aria-required="true">*</span></label>
                                <input required type="text" size="30" maxlength="14" value="" name="cpf" id="cpf" class="form-control mask_cpf valid" placeholder="CPF" aria-required="true" aria-invalid="false">
                            </p>
                        </div>
                        <div class="col-sm-6">
                            <p class="contact-form-phone">
                                <label for="email">E-mail: <span class="required" aria-required="true">*</span></label>
                                <input required type="email" size="30" value="" name="email" id="email" class="form-control" placeholder="E-mail">
                            </p>
                        </div>
                        
                        <div class="col-sm-6">
                            <p class="contact-form-phone">
                                <label for="cnpj">Senha: </label>
                                <input required type="password" size="30" value="" name="senha" id="senha" class="form-control" placeholder="Senha">
                            </p>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <input type="submit"name="btnCadastrar" class="btn btn-success" style="margin-top: 10px; margin-left: 15px;" value="Cadastrar"/>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
                </div>
            </div>
        </div>
    </div>
</div>   
        <div class="wrapper"><!--bg-container -->

<style>
    .bx-controls-direction{
        display: none;
    }
    .bx-wrapper{
        padding: 0;
        margin: 0;
        margin-top: 60px;
        background-color: transparent;
        background: transparent;
        -moz-box-shadow: none;
        -webkit-box-shadow:none;
        box-shadow: none;
        border: none;
    }
</style>
<div class="row-fluid bg-container clearfix">
    <div class="container">
        <!-- Frame -->
        <div class="col-md-8 search-tabs search-tabs-bg search-tabs-abs " formulario_pesquisa_emitir="1" iframe="1">

            <div class="tabbable frame clearfix ">

                <div class="tab-content">
                    <% 
                            if(session.getAttribute("erros") !=null)
                            {
                                out.print(session.getAttribute("erros"));
                            }
                        %>
                    <div class="seal"><img src="assets/images/selo.png" class="img-responsive" alt=""/></div>
                    <div class="tab-pane fade in active" id="tab-1">
                        <h2>Encontre voos baratos</h2>
                        <form action="SrvPassagem" method="POST">
                            <div class="tabbable clearfix inputs-container">
                                <ul class="nav nav-pills nav-sm nav-no-br clearfix mb20" id="flightChooseTab">
                                    <li class="active"><a href="#flight-search-1" data-toggle="tab" id="clickidaevolta">Ida e Volta</a>
                                    </li>
                                    <li><a href="#flight-search-2" data-toggle="tab" id="clickida">Somente Ida</a>
                                    </li>
                                    <input type="hidden" id="valorselecao" name="valorselecao" value="" />
                                </ul>
                                <script>
                                    $(document).ready( function (){
                                        $('#valorselecao').val("IV");
                                        $('#clickidaevolta').click( function() {
                                            $('#valorselecao').val("IV");
                                            //alert($('#valorselecao').val());
                                        });
                                        
                                        $('#clickida').click( function() {
                                             $('#valorselecao').val("I");
                                             //alert($('#valorselecao').val());
                                        });
                                    });
                                </script>
                                <div class="tab-content clearfix">
                                    <div class="tab-pane fade in active" id="flight-search-1">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group form-group-lg form-group-icon-left">
                                                    <label>Origem:</label>
                                                    <select class="form-control select-campos" origem="1" name="origem-ida-volta">
                                                        <%
                                                            List<AeroportoBean> lista = (new AeroportoDAO()).listaAeroportos();
                                                            if(lista!=null){
                                                                for(AeroportoBean aero:lista){
                                                          %>
                                                        <option value="<%=aero.getId()%>" 
                                                                <% 
                            if(session.getAttribute("pesq_origem") !=null) {  if( Integer.parseInt(session.getAttribute("pesq_origem").toString()) == aero.getId()) { out.print("selected='selected'");} } %>
                                                                ><%=aero.getCidade()%></option>
                                                        <%
                                                            }
                                                            }
                                                          %>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group form-group-lg form-group-icon-left">
                                                    <label>Destino: </label>
                                                    <select class="form-control select-campos" destino="1" name="destino-ida-volta">
                                                         <%
                                                            List<AeroportoBean> lista2 = (new AeroportoDAO()).listaAeroportos();
                                                            if(lista2!=null){
                                                                for(AeroportoBean aero2:lista2){
                                                          %>
                                                        <option value="<%=aero2.getId()%>"
                                                                 <% 
                            if(session.getAttribute("pesq_destino") !=null) {  if(Integer.parseInt(session.getAttribute("pesq_destino").toString()) == aero2.getId()) { out.print("selected='selected'");} } %>
                                                                ><%=aero2.getCidade()%></option>
                                                        <%
                                                            }
                                                            }
                                                          %>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="input-daterange" data-date-format="M d, D">
                                            <div class="row">
                                                <div class="col-md-6">

                                                    <div class="form-group form-group-lg form-group-icon-left">
                                                        <label>Ida</label>

                                                       <div class="input-group date">
                                                            <input type="text" name="start" id="ddida" class="form-control" value=" <% 
                            if(session.getAttribute("pesq_start") !=null) {  out.print(session.getAttribute("pesq_start")); } %>"><span class="input-group-addon"><i class="glyphicon glyphicon-th"></i></span>
                                                          </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group form-group-lg form-group-icon-left">
                                                        <label>Volta</label>
                                                        <div class="input-group date">
                                                            <input type="text" name="end" id="ddvolta" class="form-control" value="<% 
                            if(session.getAttribute("pesq_end") !=null) {  out.print(session.getAttribute("pesq_end")); } %>"><span class="input-group-addon"><i class="glyphicon glyphicon-th"></i></span>
                                                          </div>
                                                        </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                                    
                                                    
                                    <div class="tab-pane fade" id="flight-search-2">
                                        <div class="row">
                                             <div class="col-md-6">
                                                <div class="form-group form-group-lg form-group-icon-left">
                                                    <label>Origem</label>
                                                    <select style="width:100% important" class="form-control select-campos" origem="1" name="origem-ida">
                                                        <%
                                                            List<AeroportoBean> lista3 = (new AeroportoDAO()).listaAeroportos();
                                                            if(lista3!=null){
                                                                for(AeroportoBean aero3:lista3){
                                                          %>
                                                        <option value="<%=aero3.getId()%>"
                                                                <% 
                            if(session.getAttribute("pesq_origem") !=null) {  if( Integer.parseInt(session.getAttribute("pesq_origem").toString()) == aero3.getId()) { out.print("selected='selected'");} } %>
                                                                ><%=aero3.getCidade()%></option>
                                                        <%
                                                            }
                                                            }
                                                          %>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group  form-group-icon-left">
                                                    <label>Destino</label>
                                                    <select style="width:100% important" class="form-control select-campos" destino="1" name="destino-ida">
                                                         <%
                                                            List<AeroportoBean> lista4 = (new AeroportoDAO()).listaAeroportos();
                                                            if(lista4!=null){
                                                                for(AeroportoBean aero4:lista3){
                                                          %>
                                                        <option value="<%=aero4.getId()%>"
                                                                <% 
                            if(session.getAttribute("pesq_destino") !=null) {  if(Integer.parseInt(session.getAttribute("pesq_destino").toString()) == aero4.getId()) { out.print("selected='selected'");} } %>
                                                                
                                                                ><%=aero4.getCidade()%></option>
                                                        <%
                                                            }
                                                            }
                                                          %>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group form-group-lg form-group-icon-left">
                                                    <label>Ida</label>
                                                    <div class="input-group date">
                                                            <input  type="text" name="startida" id="ddstartida" class="form-control" value=" <% 
                            if(session.getAttribute("pesq_start") !=null) {  out.print(session.getAttribute("pesq_start")); } %>"><span class="input-group-addon"><i class="glyphicon glyphicon-th"></i></span>
                                                          </div>
                                                </div>
                                            </div>
<script>
                                                        
                                                        $('#ddida, #ddvolta, #ddstartida').datepicker({
                                                            format: "dd/mm/yyyy",
                                                            startDate: "today",
                                                            todayBtn: true,
                                                            language: "pt-BR",
                                                            beforeShowYear: function (date){
                                                                          if (date.getFullYear() == 2007) {
                                                                            return false;
                                                                          }
                                                                        },
                                                            defaultViewDate: { year: 1977, month: 04, day: 25 }
                                                        });
                                                        
                                                       
                                                        </script>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row-fluid clearfix row-button-frame">
                                <div class="col-md-12">
                                    <input class="btn button-custom btn-lg pull-right" type="submit" name="btnpesquisar" value="Pesquisar" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- /Frame -->

    </div>
</div>
<!-- /bg-container --><!-- divider -->
<div class="row-fluid divider clearfix">
    <div class="container">
        <div class="col-md-12">
            <div class="row">
                <h2>Sua Pesquisa</h2>
            </div>
        </div>
    </div>
</div>
<!-- /divider -->

<!-- blocks -->
<div class="row-fluid clearfix">
    <div class="container">
        <div class="row">
            <div class="col-md-12 col-sm-12">
                <form action="SrvPassagem" method="POST">
                <div class="row-fluid ">
                    <table class="table table-widget">
                        <thead>
                        <tr>
                            <th colspan="6" class="text-center"> <span>Passagens Aéreas Promocionais - IDA </span></th>
                        </tr>
                        </thead>
                        <tbody>
                        <!-- item loop -->
                        <% 
                            if(session.getAttribute("conteudoida") !=null)
                            {
                                out.print(session.getAttribute("conteudoida"));
                            }
                        %>

                        
                      </table>
                        <br />
                        <br />
                         <table class="table table-widget">
                        <thead>
                        <tr>
                            <th colspan="6" class="text-center"> <span>Passagens Aéreas Promocionais - VOLTA</span></th>
                        </tr>
                        </thead>
                        <tbody>
                        <!-- item loop -->
                        <% 
                            if(session.getAttribute("conteudovolta") !=null)
                            {
                                out.print(session.getAttribute("conteudovolta"));
                            }
                        %>

                        
                      </table>
                </div>
                        <input type="submit" name="btnComprar" value="Comprar" class="btn button-custom pull-right" />
              </form>
            </div>
        </div>
    </div>
</div>



<!-- newletter block -->
<div class="row-fluid mtb20 container-news clearfix">
    <div class="container mt20">
        <div class="row clearfix">
            <div class="col-md-4 col-sm-6 ">
                         <span>
                             <strong>Não perca nenhuma promoção!</strong>
                             Assine nossa newsletter e comece a economizar.
                         </span>
            </div>
            <div class="col-md-8 col-sm-6 mt20 widget_wysija_cont html_wysija">
                <div id="msg-form-wysija-html55633be2caafc-3" class="wysija-msg ajax"></div>
                <div class="row">
                    <form id="form-wysija-html55633be2caafc-3" method="post" action="#wysija" class="widget_wysija html_wysija">

                        <div class="col-md-6 col-sm-12 ">
                            <div class="form-group wysija-paragraph">
                                <input type="text" name="wysija[user][firstname]" class="wysija-input form-control " title="Nome"  value="" placeholder="seu nome" />
                                <span class="abs-req">
                                    <input type="text" name="wysija[user][abs][firstname]" class="wysija-input  form-control validated[abs][firstname]" value="" placeholder="seu nome" />
                                </span>
                            </div>
                        </div>

                        <div class="col-md-6 col-sm-12 ">
                            <div class="form-group wysija-paragraph">
                                <div class="input-group wysija-required">
                                    <input type="text" name="wysija[user][email]" class="wysija-input form-control validate[required,custom[email]]" title="Email"  value="" placeholder="seu email" />
                                    <span class="abs-req">
                                        <input type="text" name="wysija[user][abs][email]" class="wysija-input validated[abs][email]" value="" placeholder="seu email"/>
                                    </span>
                                    <span class="input-group-btn">
                                        <button class="wysija-submit wysija-submit-field btn button-news " type="submit">ENVIAR</button>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <input type="hidden" name="form_id" value="3" />
                        <input type="hidden" name="action" value="save" />
                        <input type="hidden" name="controller" value="subscribers" />
                        <input type="hidden" value="1" name="wysija-page" />
                        <input type="hidden" name="wysija[user_list][list_ids]" value="3" />

                    </form>
                </div>
            </div>

        </div>
    </div>
</div>





        <!-- subfooter -->
        <div class="row-fluid mtb20 subfooter clearfix">
            <div class="container">
                <div class="row clearfix">
                    <div class="col-md-12 ">
                        <div class="row-fluid mtb20 text-center">
                            <div class="row-fluid title ">segurança e <span>credibilidade</span></div>
                        </div>
                        <div class="row-fluid mtb20 clearfix text-center hidden-xs">
                            <img src="assets/images/credibilidade.jpg" alt="Segurança e Credibilidade abav clearsale iata alpha ssl" class="img-responsive credibilidade"/>
                        </div>
                    </div>

                </div>
                <div class="row mb20 clearfix">
                    <div class="col-xs-4 visible-xs"><img class="img-responsive credibilidade" src="assets/images/alphassl.jpg" alt="alpha ssl"/></div>
                    <div class="col-xs-4 visible-xs"><img class="img-responsive credibilidade" src="assets/images/clearsale.jpg" alt="clearsale"/></div>
                    <div class="col-xs-4 visible-xs"><img class="img-responsive credibilidade" src="assets/images/clearsale_.jpg" alt="clearsale"/></div>
                </div>
                <div class="row  mb20 clearfix">
                    <div class="col-xs-4 visible-xs"><img class="img-responsive credibilidade" src="assets/images/iata.jpg" alt="iata"/></div>
                    <div class="col-xs-4 visible-xs"><img class="img-responsive credibilidade" src="assets/images/abav.jpg" alt="abav"/></div>
                    <div class="col-xs-4 visible-xs"><img class="img-responsive credibilidade" src="assets/images/cadastur.jpg" alt="cadastur"/></div>
                </div>
            </div>
        </div>
        <!-- /subfooter -->

        <!-- copyright -->
        <div class="row-fluid blue-block  clearfix">
            <div class="container container-address">
                <div class="row clearfix ">
                    <div class="col-md-8 pb20">
                        <br/>
                        © 2016 Passagens Toledo - Todos os direitos reservados
                    </div>
                    <div class="col-md-4 text-right voltar_topo">
                        <a id="totop" href="#"  >voltar ao topo</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- copyright -->

        </div>


        <!-- /wrapper multisites -->


        <!--frame-->
        <script   src="https://code.jquery.com/jquery-1.11.1.min.js"></script>
        <script src="assets/js/select2.min.js"></script>
        <script type="text/javascript">
          $('.select-campos').select2();
        </script>
        <script type="text/javascript" src="assets/js/jquery-ui.js"></script>
        <script type="text/javascript" src="assets/plugins/formulario.js"></script>
        <script type="text/javascript" src="assets/plugins/json2.js"></script>
        <script> $(document).ready(function(){ FormularioPesquisaEmitir.init({url_base: 'http://www.passagenspromo.com.br', antecedencia_minima: 2}); }); </script>
        <script type="text/javascript">
            $( document ).ready(function() {

                $('a[data-toggle="tab"][href="#flight-search-1"]').on('shown.bs.tab', function (e) {
                    $('input[name="tipo_viagem"]').val('ida_e_volta');

                })

                $('a[data-toggle="tab"][href="#flight-search-2"]').on('shown.bs.tab', function (e) {
                    $('input[name="tipo_viagem"]').val('somente_ida');
                })

            });
        </script>
        <script type="text/javascript">
            $( document ).ready(function() {
                if ($( ".selects-tam .container_result ul" ).length) {
                    $('.selects-tam .container_result ul').hide();
                    $('.selects-tam .container_result' ).children().eq(1).show();
                    $('.selects-tam select').change(function () {
                        $('.selects-tam .container_result ul').hide();
                        $('.selects-tam .container_result ul.result-'+$(this).val()).show();
                    });

                }

                if ($( ".selects-gol .container_result ul" ).length) {
                    $('.selects-gol .container_result ul').hide();
                    $('.selects-gol .container_result' ).children().eq(1).show();
                    $('.selects-gol select').change(function () {
                        $('.selects-gol .container_result ul').hide();
                        $('.selects-gol .container_result ul.result-'+$(this).val()).show();
                    });

                }

                if ($( ".selects-azul .container_result ul" ).length) {
                    $('.selects-azul .container_result ul').hide();
                    $('.selects-azul .container_result' ).children().eq(1).show();
                    $('.selects-azul select').change(function () {
                        $('.selects-azul .container_result ul').hide();
                        $('.selects-azul .container_result ul.result-'+$(this).val()).show();
                    });

                }
            });
        </script>

        <script type="text/javascript">
            $('#totop').click(function(){
                console.log('clicktop');
                var target = $( "html" );
                $('html,body').animate({
                  scrollTop: target.offset().top
                }, 1000);
                return false;
            });
        </script>
 
        
        <script>

            $(document).ready(function(){



                $("#item_menu_hotel").click(function(){
                    $("#item_menu_passagem").removeClass();
                    $("#item_menu_rodoviario").removeClass();
                    $(this).addClass('active');
                    $(".frame_aereo").hide();
                    $(".frame_rodoviario").hide();
                    $(".frame_hotel").show();
                });
                $("#item_menu_passagem").click(function(){
                    $("#item_menu_hotel").removeClass();
                    $("#item_menu_rodoviario").removeClass();
                    $(this).addClass('active');
                    $(".frame_hotel").hide();
                    $(".frame_rodoviario").hide();
                    $(".frame_aereo").show();
                });
                $("#item_menu_rodoviario").click(function(){
                    $("#item_menu_hotel").removeClass();
                    $("#item_menu_passagem").removeClass();
                    $(this).addClass('active');
                    $(".frame_hotel").hide();
                    $(".frame_aereo").hide();
                    $(".frame_rodoviario").show();
                });

                // Controle news no rodape
                /**
                 * strCookie = Nome do cookie
                 * strValor = Valor que será salvo no cookie
                 * lngDias = Dias de validade do cookie
                 */
                function gerarCookie(strCookie, strValor, lngDias) {
                    $.cookie(strCookie, strValor, {
                        expires : lngDias
                    });
                }


              

            });


            function change_somente_ida(){
                $('.volta_container').css('opacity', '0.2');
                $('[formulario_aereo] [data_volta]').datepicker( "option", "disabled", true );
            }

            function change_ida_e_volta(){
                $('.volta_container').css('opacity', '2');
                $('[formulario_aereo] [data_volta]').datepicker( "option", "disabled", false );
            }

            function change_somente_ida_rodoviario(){
                $('[formulario_rodoviario] .volta_container').css('opacity', '0.2');
                $('[formulario_rodoviario] [data_volta]').datepicker( "option", "disabled", true );
            }

            function change_ida_e_volta_rodoviario(){
                $('[formulario_rodoviario] .volta_container').css('opacity', '2');
                $('[formulario_rodoviario] [data_volta]').datepicker( "option", "disabled", false );
            }



        </script>



                <script type="text/javascript">
        // <![CDATA[
        var disqus_shortname = 'passagenspromocombr';
        (function () {
            var nodes = document.getElementsByTagName('span');
            for (var i = 0, url; i < nodes.length; i++) {
                if (nodes[i].className.indexOf('dsq-postid') != -1) {
                    nodes[i].parentNode.setAttribute('data-disqus-identifier', nodes[i].getAttribute('data-dsqidentifier'));
                    url = nodes[i].parentNode.href.split('#', 1);
                    if (url.length == 1) { url = url[0]; }
                    else { url = url[1]; }
                    nodes[i].parentNode.href = url + '#disqus_thread';
                }
            }
            var s = document.createElement('script');
            s.async = true;
            s.type = 'text/javascript';
            s.src = '//' + disqus_shortname + '.disqus.com/count.js';
            (document.getElementsByTagName('HEAD')[0] || document.getElementsByTagName('BODY')[0]).appendChild(s);
        }());
        // ]]>
        </script>
        <script type='text/javascript'>
/* <![CDATA[ */
var pollsL10n = {"ajax_url":"http:\/\/www.passagenspromo.com.br\/home\/wp-admin\/admin-ajax.php","text_wait":"Seu \u00faltimo pedido ainda est\u00e1 sendo processada. Por favor espere um pouco...","text_valid":"Por favor, escolha uma resposta v\u00e1lida.","text_multiple":"N\u00famero m\u00e1ximo de op\u00e7\u00f5es permitidas:","show_loading":"1","show_fading":"1"};
/* ]]> */
</script>
<script type='text/javascript' src='assets/plugins/wp-polls/polls-js1b5e.js?ver=2.73'></script>
<script type='text/javascript' src='assets/plugins/bookingcom-official-searchbox/js/bos_main62ea.js?ver=1.2'></script>
<script type='text/javascript'>
/* <![CDATA[ */
var objectL10n = {"destinationErrorMsg":"Desculpe, precisamos de pelo menos parte do nome para iniciar a pesquisa.","tooManyDays":"Voc\u00ea selecionou uma data de sa\u00edda para mais de 30 di\u00e1rias ap\u00f3s a data de entrada. As reservas s\u00f3 podem ser feitas por um per\u00edodo m\u00e1ximo de 30 di\u00e1rias. Por favor, escolha outras datas.","dateInThePast":"A data de entrada selecionada j\u00e1 passou. Por favor, verifique suas datas e tente novamente.","cObeforeCI":"Por favor, verifique as suas datas. A data de entrada \u00e9 anterior \u00e0 data de sa\u00edda.","calendar_nextMonth":"M\u00eas seguinte","calendar_prevMonth":"M\u00eas anterior","calendar_closeCalendar":"Fechar calend\u00e1rio","january":"Janeiro","february":"Fevereiro","march":"Mar\u00e7o","april":"Abril","may":"Maio","june":"Junho","july":"Julho","august":"Agosto","september":"Setembro","october":"Outubro","november":"Novembro","december":"Dezembro","mo":"Seg.","tu":"Ter.","we":"Qua.","th":"Qui.","fr":"Sex.","sa":"Sab.","su":"Dom.","updating":"Atualizando...","close":"Fechar","placeholder":"Ex.: cidade, regi\u00e3o, bairro ou hotel espec\u00edfico","aid":"382821","dest_type":"select","calendar":"0","month_format":"short","flexible_dates":"0","logodim":"blue_150x25","logopos":"left","buttonpos":"right","bgcolor":"#FEBA02","textcolor":"#003580","submit_bgcolor":"#0896FF","submit_bordercolor":"#0896FF","submit_textcolor":"#FFFFFF","aid_starts_with_four":"affiliate ID is different from partner ID: should start with a 3 or an 8. Please change it.","images_js_path":"http:\/\/www.passagenspromo.com.br\/home\/wp-content\/plugins\/bookingcom-official-searchbox\/images"};
/* ]]> */
</script>
<script type='text/javascript' src='assets/plugins/bookingcom-official-searchbox/js/bos_date5152.js?ver=1.0'></script>
<script type='text/javascript' src='assets/plugins/wp-embed.min3428.js?ver=4.5.2'></script>

</body>
</html>
