$(document).ready(function() {
    /* Controle de tamanho de fonte do portal */
    $('#a').click(function(e) {
        e.preventDefault();
        $('#content').css("font-size", "80%");
    });
    $('#aa').click(function(e) {
        e.preventDefault();
        $('#content').css("font-size", "100%");
    });
    $('#aaa').click(function(e) {
        e.preventDefault();
        $('#content').css("font-size", "150%");
    });

    /* Navegacao por tab na navegacao global */
    jQuery(document).ready(function() {
        var valor = 5;
        jQuery("#searchGadget").attr("tabindex", valor);
        $("#navigation li a").each(function(n) {
            $(this).attr("tabindex", valor + n + 1);
            var len = $('#navigation > li a').length;
        });
    });
    
    var url = $(location).attr('href');
    link = "/" + url.split("/")[3];
    $("a#link-da-setion").attr("href", link);


    /* Contador de caracteres em noticias */
    jQuery(document).ready(function() {

        /* Contadora de catarcteres */

        jQuery(".template-atct_edit.portaltype-news-item input#title").keyup(function() {

            var digitados = jQuery(this).val().length;
            var restante = 111 - digitados;

            jQuery("#archetypes-fieldname-title .required").text("| Caracteres restantes:" + restante);

            if (restante < 0) {
                jQuery("#archetypes-fieldname-title .required").text("| Cuidado, título grande demais");
                jQuery("#archetypes-fieldname-title .required").css('color', 'red');
            } else {
                jQuery("#archetypes-fieldname-title .required").css('color', '#000');
            }

        }).keyup();

        /* Vimeo magic */

        jQuery("#form-widgets-link_do_video").focusout(function() {

            var linkVideo = jQuery('#form-widgets-link_do_video').val();


            if (/vimeo/i.test(linkVideo)) {

                var urlXml = 'http://vimeo.com/api/oembed.xml?url=' + linkVideo;

                jQuery.get(urlXml, {}, function(xml) {
                    jQuery('oembed', xml).each(function(i) {
                        descrica = jQuery(this).find("description").text();
                        titulo = jQuery(this).find("title").text();
                        jQuery("#form-widgets-IDublinCore-title").attr('value', titulo);
                        jQuery("#form-widgets-IDublinCore-description").attr('value', descrica);
                    });
                });
            }


        });
    });

    /* Navegacao por tab pra busca ter foco */
    jQuery(document).ready(function() {
        $('#link-buscar').click(function(e) {
            e.preventDefault();
            window.location.hash = '#portal-searchbox';
            $('.searchField').focus();
        });
    });

    /* expansao de segundo e terceiro nivel da navegacao por tab */
    jQuery(document).ready(function() {
        /* cria estilos de navegacao via teclado */
        if ($('#seletor').css('display') == 'none') {
            var menu = $("#navigation");
            var lis = menu[0].getElementsByTagName('li');
            for (var i = 0, li; li = lis[i]; i++) {
                var link = li.getElementsByTagName('a')[0];
                /* segundo nivel */
                if (link) {
                    link.onfocus = function() {
                        var ul = this.parentNode.getElementsByTagName('ul')[0];
                        if (ul) {
                            var classe = ul.className;
                            console.log(classe);
                            if (classe.indexOf("nav-sub2")) {
                                /* segundo nivel*/
                                ul.style.display = 'block';
                                ul.style.visibility = 'visible';
                                ul.style.background = 'rgba(30, 32, 56, .9)';
                                ul.style.opacity = '1';
                                ul.style.padding = '10px 0 0 11px';
                                ul.style.margin = '0';
                            } else {
                                /* terceiro nivel*/
                                ul.style.display = 'block';
                                ul.style.background = '#000';
                                ul.style.opacity = '1';
                                ul.style.padding = '27px 0 0 20px';
                                ul.style.position = 'absolute';
                                ul.style.top = '-10px';
                                ul.style.right = '-276%';
                                ul.style.overflow = 'hidden';
                                ul.style.height = 'auto';
                            }
                        }
                    };
                    var ul = link.parentNode.getElementsByTagName('ul')[0];
                    if (ul) {
                        var ullinks = ul.getElementsByTagName('a');
                        var ullinksqty = ullinks.length;
                        var lastItem = ullinks[ullinksqty - 1];
                        if (lastItem) {
                            lastItem.onblur = function() {
                                this.parentNode.parentNode.style.display = '';
                                this.parentNode.parentNode.style.visibility = '';
                                this.parentNode.parentNode.style.padding = '';
                                this.parentNode.parentNode.style.position = '';
                                this.parentNode.parentNode.style.top = '';
                                this.parentNode.parentNode.style.right = '';
                                this.parentNode.parentNode.style.overflow = '';
                                this.parentNode.parentNode.style.height = '';
                            };
                        }
                    }
                }

            }
        }
    });

    /* Traducao de termos em ingles */
    jQuery(".subsection-english #searchGadget").attr("placeholder", "Search in portuguese");
    jQuery(".subsection-english .portlet-collection-agenda .portletHeader a span").html("Next Events");
    jQuery(".subsection-english #global-list2, .subsection-english .links_berra_sup, .subsection-english .links-primarios-rodape, .subsection-english #global-list3,.subsection-english #global-list3+.list").hide();
    jQuery(".subsection-english #global-list1").html("<a class='link-pri' href='http://portal.metodista.br/english'>PRESENTATION</a>");
    jQuery(".subsection-english #global-list4").html("<a class='link-pri' href='http://portal.metodista.br/sobre/campi-e-localizacao'>LOCATION</a>");
    jQuery(".subsection-english #global-list5").html("<a class='link-pri' href='http://portal.metodista.br/fale-conosco'>CONTACT</a>");
    jQuery(".subsection-english #breadcrumbs-you-are-here").html("You are here:");

    /* fixa o menu em scroll acima de 120px */
    if ($('#portal-column-one').width() < 300) {
        jQuery(window).scroll(function(e) {
            if (jQuery(window).scrollTop() > 120) {
                jQuery(".menu-container").addClass('fixed');
            } else {
                jQuery(".menu-container").removeClass('fixed');
            }
        });
    }

    /* funcao de contraste do portal */
    jQuery(function($) {
        $('#siteaction-contraste a').click(
            function(e) {
                if ($.cookie('contraste') === null) {
                    $.cookie('contraste', 'on');
                    $('body').addClass('contraste');
                    e.preventDefault();
                    return false;
                } else {
                    if ($.cookie('contraste') == 'on') {
                        $.cookie('contraste', 'off');
                        $('body').removeClass('contraste');
                        e.preventDefault();
                        return false;
                    } else {
                        $.cookie('contraste', 'on');
                        $('body').addClass('contraste');
                        e.preventDefault();
                        return false;
                    }
                }
            });
        if ($.cookie('contraste') == 'on') {
            $('body').addClass('contraste');
            return false;
        }
    });
    
    
    jQuery(document).ready(function() {
        var mobilizeMenu = function(este) {
            if(!(este.has("ul").length)){
                $('<a>').attr('href', $('a',este).attr('href')).text($('a',este).text().trim()).prependTo('#navigation').wrap("<li class='list scdmenu'></li>");
            } else {
                var prefixo = $('span',este).text().trim();
                $('li',este).each(function() {
                    console.log(prefixo);
                    $('<a>').attr('href', $('a',this).attr('href')).text(prefixo + " - " + $('a',this).text().trim()).prependTo('#navigation').wrap("<li class='list scdmenu'></li>");
                });
            }
        }
        if ($('#portal-column-one').width() > 300) {
            if($('#portal-column-one > div > .portletStaticText').first().is('[class*="sobre"]')) {
                $($('#portal-column-one > div > .portletStaticText').get().reverse()).each(function(){
                    if(!($(this).is('[class*="coord"]') || $(this).is('[class*="selo-guia"]') || $(this).is('[class*="opt"]') )){
                        mobilizeMenu($(this));
                    }
                });
            }
            if($('#portal-column-one > div > .portletStaticText').first().is('[class*="futuros-alunos"]')) {
                $($('#portal-column-one > div > .portletStaticText').get().reverse()).each(function(){
                    mobilizeMenu($(this));
                });
            }
        }
    });

    
});