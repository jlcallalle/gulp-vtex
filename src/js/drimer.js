//Detecciones de ie 9 e ie8 (si no se usaran eliminar)
conditionizr.add('ie11', /(?:\sTrident\/7\.0;.*\srv:11\.0)/i.test(navigator.userAgent));
conditionizr.add('ie10', !!(Function('/*@cc_on return (/^10/.test(@_jscript_version) && /MSIE 10\.0(?!.*IEMobile)/i.test(navigator.userAgent)); @*/')()));
conditionizr.add('ie9', !!(Function('/*@cc_on return (/^9/.test(@_jscript_version) && /MSIE 9\.0(?!.*IEMobile)/i.test(navigator.userAgent)); @*/')()));
conditionizr.add('chrome', [], function() {
    return !!window.chrome && /google/i.test(navigator.vendor);
});
//Que hacer cuando sean positivas las detecciones (eliminar si no se usaran)
/*conditionizr.config({
    assets: 'js/',
    tests: {
        'ie8': ['class']
    }
});*/
conditionizr.config({
    assets: '',
    tests: {
        'ie11': ['class'],
        'ie10': ['class'],
        'ie9': ['class'],
        'chrome': ['class']
    }
});

var Medialab = {
    matchMovilDesktop: {
        bodyclassNav: function() {
            var $window = $(window),
                $html = $('body'),
                $toggle = false,
                rtime,
                timeout = false,
                delta = 200;

            $(window).resize(function() {
                rtime = new Date();
                if (timeout === false) {
                    timeout = true;
                    setTimeout(resizeend, delta);
                }
            }).trigger('resize');

            function resizeend() {
                if (new Date() - rtime < delta) {
                    setTimeout(resizeend, delta);
                } else {
                    timeout = false;
                    if (($window.width() >= 320) && ($window.width() <= 680)) {
                        $('body').addClass('dm_mobile');
                        $('body').addClass('mobile-Medialab');
                        $(".flab-detalle").appendTo("#include");
                        $('#header .in #nav .category li.wH>a').on('click', function(e) {
                            e.preventDefault();
                            var value = $(this).attr("href");
                            if ($(this).parent().hasClass('active')) {
                                $('#header .in #nav .category li.wH>a').parent().removeClass('active');
                                $('#header .in #nav .category li.wH>a').next().slideUp();
                            } else {
                                $('#header .in #nav .category li.wH>a').parent().removeClass('active');
                                $('#header .in #nav .category li.wH>a').next().slideUp();
                                $(this).parent().toggleClass('active');
                                $(this).next().slideToggle();
                            };
                        });


                        $('#header .in #nav .category li.conoce > a').on('click', function(e) {
                            e.preventDefault();
                            // console.log(this);
                            var value = $(this).attr("href");
                            if ($(this).parent().hasClass('active')) {
                                $('#header .in #nav .category li.conoce > a').parent().removeClass('active');
                                $('#header .in #nav .category li.conoce > a').next().slideUp();
                            } else {
                                $('#header .in #nav .category li.conoce >a').parent().removeClass('active');
                                // $('#header .in #nav .category li.conoce a').next().slideUp();
                                $(this).parent().toggleClass('active');
                                $(this).next().slideToggle();
                            };
                        });


                        $('.wHoverNav .sub .btn').on('click', function(e) {
                            e.preventDefault();
                            if ($(this).hasClass('active')) {
                                $('.wHoverNav .sub .btn').removeClass('active');
                                $('.wHoverNav .sub .btn').next().slideUp();
                            } else {
                                $('.wHoverNav .sub .btn').removeClass('active');
                                $('.wHoverNav .sub .btn').next().slideUp();
                                $(this).toggleClass('active');
                                $(this).next().slideToggle();
                            };
                        });
                        $(window).on('scroll', function() {
                            if ($(window).scrollTop() > 100) {
                                $('body').addClass('espace');
                                $('#header').addClass('fixed');
                            } else {
                                $('body').removeClass('espace');
                                $('#header').removeClass('fixed');
                            }
                        });

                        $('.menu-departamento .search-multiple-navigator h3').on('click', function(e){
                          e.preventDefault();
                          $('.menu-departamento .search-multiple-navigator').toggleClass('show');
                          if(!$('.menu-departamento .search-multiple-navigator').hasClass('show')){
                            $('.menu-departamento .search-multiple-navigator div').hide();
                          }
                        });
                        $('.menu-departamento .search-multiple-navigator fieldset h5').on('click', function(){
                          $(this).toggleClass('hide_field');
                          $(this).next().slideToggle();
                        });

                        //Filtro Movil busqueda
                        $('.menu-departamento .search-single-navigator h3').on('click', function(e){
                          e.preventDefault();
                          $(this).next().toggleClass('show');
                        });
        

                        $toggle = true;

                        //add wrapp link cart
                        $( ".carrito .info" ).wrap( "<a href='/checkout#/cart'></a>" );

                    } else {
                        $('body').removeClass('dm_mobile');
                        $('body').addClass('dm_desktop');
                        $('#nav .category > li').hoverIntent(function() {
                            $(this).toggleClass('active');
                            $(this).children('.wHoverNav').fadeToggle(50);
                            $(this).children('.wHoverNav').css('z-index','100');
                        });

                    };
                };
            };
        }
    },
    flag: {
        formatPrecioDescuento: function(){
            //SOLO PARA PROMO
            /*$(".contentFlag .flag").each(function() {
              var elText,
                  openSpan = '<span class="desc-word">',
                  closeSpan = '</span>';
              elText = $(this).text().split(" ");
              elText.unshift(openSpan);
              elText.splice(2, 0, closeSpan);
              elText = elText.join(" ");
              $(this).html(elText);
            });
            $(".flab-detalle .flag").each(function() {
              var elText,
                  openSpan = '<span class="desc-word">',
                  closeSpan = '</span>';
              elText = $(this).text().split(" ");
              elText.unshift(openSpan);
              elText.splice(2, 0, closeSpan);
              elText = elText.join(" ");
              $(this).html(elText);
            });
            $(".compare .flag").each(function() {
              var elText,
                  openSpan = '<span class="desc-word">',
                  closeSpan = '</span>';
              elText = $(this).text().split(" ");
              elText.unshift(openSpan);
              elText.splice(2, 0, closeSpan);
              elText = elText.join(" ");
              $(this).html(elText);
            });
            */
            if ($('body.producto').length) {
                if ($('.plugin-preco').length) {
                    Medialab.especificacionProducto.formatPrice($(".skuListPrice"));
                    Medialab.especificacionProducto.formatPrice($(".skuPrice"));
                }

                //Se agrega Flag Desc en Imagen de Producto
                $.each($('.product-main-view'), function(e, element) {
                    if (!$(this).find('.dscto').length) {
                        var antes = $(element).find('.skuListPrice').text().substring(3);
                        var ahora = $(element).find('.skuPrice').text().substring(3);
                        var nAntes = antes.split(',').join('');
                        var nAhora = ahora.split(',').join('');
                        if (nAntes !== '') {
                            var numDescuento = (1 - (Number(nAhora) / Number(nAntes))) * 100;
                            if (numDescuento % 1 != 0)
                                numDescuento = numDescuento.toFixed(0);
                            $(element).find('.flab-detalle').html('<p class="flag dscto">' + numDescuento + '% <span class="desc-word">dscto </span></p>');
                        }
                    }
                });

                //Se agrega Flag Desc en slider intereses de Producto
                $.each($('.interes .itemProduct .slick-track li'), function(e, element) {
                    if (!$(this).find('.dscto').length) {
                        var antes = $(element).find('.antes').text().substring(3);
                        var ahora = $(element).find('.ahora').text().substring(3);
                        var nAntes = antes.split(',').join('');
                        var nAhora = ahora.split(',').join('');
                        if (nAntes !== '') {
                            var numDescuento = (1 - (Number(nAhora) / Number(nAntes))) * 100;
                            if (numDescuento % 1 != 0)
                                numDescuento = numDescuento.toFixed(0);
                            $(this).find('.contentFlag').html('<p class="flag dscto">' + numDescuento + '% <span class="desc-word">dscto </span></p>');
                        }
                    }
                });

            }


            //Se agrega Flag Desc en slider ofertas de Home
            if ($('.home').length) {
    
                $.each($('.ofertas .itemProduct .slick-track li'), function(e, element) {
                    if (!$(this).find('.dscto').length) {
                        var antes = $(element).find('.antes').text().substring(3);
                        var ahora = $(element).find('.ahora').text().substring(3);
                        var nAntes = antes.split(',').join('');
                        var nAhora = ahora.split(',').join('');
                        if (nAntes !== '') {
                            var numDescuento = (1 - (Number(nAhora) / Number(nAntes))) * 100;
                            if (numDescuento % 1 != 0)
                                numDescuento = numDescuento.toFixed(0);
                            $(element).find('.contentFlag').append('<p class="flag dscto">' + numDescuento + '% <span class="desc-word">dscto </span></p>');
                        }
                    }
                });
            }


        }
    },
    bxslider: {
        slider: function() {
            $('.bxslider').bxSlider({
                adaptiveHeight: !0,
                responsive: !0,
                auto: true,
                pause: 5000,
                mode: "fade",
                auto: ($(".bxslider .box-banner").length > 1) ? true: false,
                pager: ($(".bxslider .box-banner").length > 1) ? true: false,
                controls: !0,
                autoControls: 0,
                adaptiveHeight: !0,
                adaptiveHeightSpeed: 10,
                autoHover: !0
            });
        }
    },
    carrouselColeccion: {
        carrusel: function() {

            // se remueve duplicado producto
            if($('section.modulo').length){
                $('.modulo .itemProduct ul .helperComplement').remove();
            }

            $('.collection .itemProduct ul').slick({
                arrows: false,
                dots: true,
                infinite: true,
                speed: 500,
                autoplay: true,
                autoplaySpeed: 5000,
                slidesToShow: 3,
                slidesToScroll: 3,
                responsive: [{
                    breakpoint: 480,
                    settings: {
                        dots: true,
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }]
            });
        }
    },
    validateForm: {
        onlyNumbers: function() {
            $(".only-numbers").on("keypress", function(n) {
                var e = /[0-9]/g,
                    r = String.fromCharCode(n.which);
                return !!($.inArray(n.keyCode) >= 0 || e.test(r));
            });
        },
        onlyLetters: function() {
            $(".only-letters").on("keypress", function(n) {
                var e = /[A-Za-z- ]/g,
                    r = [8, 37, 39, 193, 225, 200, 232, 205, 237, 211, 243, 218, 250, 209, 241],
                    t = String.fromCharCode(n.which);
                return !!($.inArray(n.keyCode, r) >= 0 || e.test(t));
            });
        },
    },
    navegacionMovil: {
        header: function() {
            $('.btn-nav-mobile').on('click', function() {
                $('#header .in').toggle();
                $('#header .in').toggleClass('active');
                $(this).toggleClass('active');
                //$('.dm_mobile #header .in #nav .category li.wH, .dm_mobile #header .in #nav .category li .wHoverNav .sub .btn').removeClass('active');
                //$('.dm_mobile #header .in #nav .category li .wHoverNav .sub .list, .dm_mobile #header .in #nav .category li .wHoverNav').hide();
            });
        },
        menuMovil: function(){
            $('.btn-nav-mobile.fa.fa-bars').click(function(){
                setTimeout(function(){
                    if($('#header .su .btn-nav-mobile').hasClass('active')){
                        $('body, #main, html').addClass('menu-nav');
                        
                        
                    }else{
                        $('body, #main, html').removeClass('menu-nav');

                        
                    }
                }, 300);
            });
        }
    },
    navegacionDesktop: {
        fixed: function() {
            $(window).scroll(function() {
                var fromTop = $(this).scrollTop();
                if (fromTop > 50) {
                    $('.dm_desktop header').addClass('ocultar-header');
                } else {
                    $('.dm_desktop header').removeClass('ocultar-header');
                }
            });
        }
    },
    navegacionSearch: {
        buscador: function() {
            $('.btn-search-mobile').on('click', function() {
                $('#header .su .busca').toggleClass('showFx');
            });
        }
    },
    textoPlaceholder: {
        cambiar: function() {
            $('.sku-notifyme-form.notifyme-form input#notifymeClientName').attr('placeholder', 'Ingrese su nombre...');
            $('.sku-notifyme-form.notifyme-form input#notifymeClientEmail').attr('placeholder', 'Ingrese su nombre...');
            $('.sku-notifyme-form.notifyme-form input#notifymeButtonOK').attr('value', 'NOTIFICARME');
        }
    },
    seleccinaProducto: {
        medida: function() {
            $('.size-product .box-plazas h2').on('click', function(e) {
                $(this).parents('.size-product').toggleClass('active');
                $(this).next().toggleClass('active');
                $('body').toggleClass('activo');
            });
            var primerProduct = $('.size-product ul li:first').find('.product-field ul li').text(); //king
            var primerSKU = $('.size-product ul li:first').find('.item').attr("data-sku"); // 30
            var idSKU = $('.product-main-view  #___rc-p-id').attr("value"); // 27
            var lista = $('.size-product .box-plazas ul li');
            $.each(lista, function(index, value) {
                var atributo = $(this).children("a").attr("data-sku");
                if (atributo == idSKU) {
                    var nombreFinal1 = $(this).find('.item-relacionado ul li').text();
                }
                $('.box-plazas h2').text(nombreFinal1);
            });
        },
        ocultar: function() {
            $(document).on('click', function(event) {
                if (!$(event.target).closest('.size-product').length) {
                    $('.size-product  ul').removeClass('active');
                }
            });
        }
    },
    mostrarProducto: {
        medida: function() {
            if ($('#size-product').is(':empty')) {
                $('#size-product').hide();
            }
        }
    },
    mostrarDoblePrecio: {
        doble: function() {
            if ($('.productPrice .valor-de').length) {
                $('.productPrice').addClass('doble-precio');
            }
        }
    }, 
    mostrarRegalo: {
        descripcion: function() {

            if ($('.product-gift-item').length) {
                var imgRegalo = $('.gift-img-wrapper img');
                var imgRegaloAttr= imgRegalo.attr("alt");
                imgRegalo.parent().addClass(imgRegaloAttr);
            }
        }
    }, 
    mostrarTextoReferencia: {
        boxtarima: function() {

            var  nameColchones = $('.bread-crumb ul li a');
            $.each(nameColchones, function(index, value) {

                var item = $(this);
                var itemtexto = item.text();

                if (itemtexto == 'Colchones') {  
                    $('.product-main-view').addClass('colchones');
                }     

            });


        }
    },
    especificacionProducto: {
        mostrar: function() {
            // var lista1 = $('#caracteristicas h4.Descripcion');
            // $(window).load(function() {
            //     $('#caracteristicas .Características').addClass('active');
            // });
            // $('#caracteristicas h4').on('click', function(e) {
            //     $('#caracteristicas h4').removeClass('active');
            //     $(this).addClass('active');
            // });

            var tabla1 = $('#caracteristicas .Descripcion');
            $('#caracteristicas h4.Caracteristicas, #caracteristicas table.Caracteristicas').wrapAll("<div class='tab-caracteristicas' />");
            $('#caracteristicas h4.Descripcion, #caracteristicas table.Descripcion').wrapAll("<div class='tab-descripcion' />");

            $.each(tabla1, function(index, value) {
                $(this).find('[class*="Icono-"]').parent().addClass('group-img-des');
                $(this).find('[class*="Icono-"]').parent().removeClass('even');

                // var imgDescripcion = $('.new .group-img-des .value-field.Icono-1-Imagen');
                // var imgTexto = imgDescripcion.text();
                // console.log(imgTexto);
                // imgDescripcion.append('<div class="img"><img src='+ imgTexto+ ' alt=""/></div>');
                // imgDescripcion.append('<div class="img"><img src=/arquivos/'+ imgTexto+ ' alt=""/></div>');
            });

            $('#caracteristicas .group-img-des').wrapAll("<div class='box-group-img' />");
            var divide = $(".group-img-des");
            for (var i = 0; i < divide.length; i += 2) {
                divide.slice(i, i + 2).wrapAll("<div class='new'></div>");
            }

        },
        formatPrice: function($campo) {
            $.each($campo, function(index, value) {
                //2.300,00
                //300,00
                var valor = $(this).text().substring(3);
                var splitDecimal = valor.split(',');
                if (splitDecimal[1] && splitDecimal[1].length == 2) {
                    var total = valor.replace(".", "").replace(",", ".").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                    $(this).text("S/. " + total);
                }
            });
        }
    },
    tabLegales: {
        mostrar: function() {
            $('.box-tab-legales a').on('click', function(e) {
                e.preventDefault();
                $('.box-tab-legales a').removeClass('active');
                $(this).toggleClass('active');
                var tab_id = $(this).attr('href');
                $(".contenedor-tab .box-tab").removeClass('active');
                $(".contenedor-tab " + tab_id).addClass('active');
            });
        }
    },
    mostrarAcordeon: {
        desplegar: function() {
            $('.accordion-section-title').click(function(event) {
                event.preventDefault();
                if (!$(this).hasClass('active')) {
                    $('.accordion-section-title').removeClass('active').next('.accordion-section-content').slideUp();
                    $(this).addClass('active').next('.accordion-section-content').slideDown();
                } else {
                    $(this).removeClass('active').next('.accordion-section-content').slideUp();
                }
            });
        },
        desplegarPrimero: function() {
            $('.accordion .accordion-section:first-child .accordion-section-title').trigger('click');
        }
    },
    mostrarFecha: {
        fecha: function(){

            var fechafinal = '';
            var fecha = new Date();
            var diames = fecha.getDate();
            var diasemana = fecha.getDay();
            var mes = fecha.getMonth() + 1;
            var ano = fecha.getFullYear();

            var textosemana = new Array(7);
            textosemana[0] = "Domingo";
            textosemana[1] = "Lunes";
            textosemana[2] = "Martes";
            textosemana[3] = "Miércoles";
            textosemana[4] = "Jueves";
            textosemana[5] = "Viernes";
            textosemana[6] = "Sábado";

            var textomes = new Array(12);
            textomes[1] = "Enero";
            textomes[2] = "Febrero";
            textomes[3] = "Marzo";
            textomes[4] = "Abril";
            textomes[5] = "Mayo";
            textomes[6] = "Junio";
            textomes[7] = "Julio";
            textomes[7] = "Agosto";
            textomes[9] = "Septiembre";
            textomes[10] = "Octubre";
            textomes[11] = "Noviembre";
            textomes[12] = "Diciembre";

            var fechafinal = "FECHA: " + textosemana[diasemana] + ", " + diames + " de " + textomes[mes] + " de " + ano;
            document.getElementById("fecha-actual").innerHTML = fechafinal;
        }
    },
    ubigeo: {
        filtrarprovincias: function() {
            $(document).on('change', '#address_departamento', function(e) {
                e.preventDefault();
                var iddepartamento = $('option:selected', this).attr('data-id');
                var option = '<option value="" data-id="">Provincia</option>';
                var option_distrito = '<option value="" data-id="">Distrito</option>';
                var provincia = $("#address_provincia");
                var distrito = $("#address_distrito");
                // return false;
                $.ajax({
                    data: {
                        accion: "search_provincia",
                        iddepartamento: iddepartamento
                    },
                    url: "https://apps.medialabdev.com/drimer/formulario/archivos/app/controller/controllerCliente.php",
                    type: 'POST',
                    dataType: 'json',
                    success: function(resp) {
                        var data = resp;
                        if (data) {
                            for (i = 0; i < data.length; i++) {
                                option += '<option value="' + data[i]['provincia'] + '" data-id="' + data[i]['id'] + '">' + data[i]['provincia'] + '</option>';
                            }
                        }
                        provincia.html(option);
                        distrito.html(option_distrito);
                    }
                });
            });
        },
        filtrardistrito: function() {
            $(document).on('change', '#address_provincia', function(e) {
                e.preventDefault();
                var idprovincia = $('option:selected', this).attr('data-id');
                var option = '<option value="" data-id="">Distrito</option>';
                var distrito = $("#address_distrito");
                // return false;
                $.ajax({
                    data: {
                        accion: "search_distrito",
                        idprovincia: idprovincia
                    },
                    url: "https://apps.medialabdev.com/drimer/formulario/archivos/app/controller/controllerCliente.php",
                    type: 'POST',
                    dataType: 'json',
                    success: function(resp) {
                        var data = resp;
                        if (data) {
                            for (i = 0; i < data.length; i++) {
                                option += '<option value="' + data[i]['distrito'] + '" data-id="' + data[i]['id'] + '">' + data[i]['distrito'] + '</option>';
                            }
                        }
                        distrito.html(option);
                    }
                });
            });
        }
    },
    comparar: {
        tabla: function() {
            var str = $(".corpo-comparacao tbody tr:nth-child(2).atributos th").text();
            var lista = $('.corpo-comparacao tbody tr');
            $.each(lista, function(index, value) {
                var atributo = $(this).children("th").text();
                $(this).addClass(atributo);
            });
            $("<a href='+linkProducto+' class='btn-comparar' >Comprar</a>").appendTo(".last");
            var agregaboton = $('.corpo-comparacao  thead th');
            $.each(agregaboton, function(index, value) {
                var link = $(this).find('.last h3 a').attr("href");
                $(this).find('.btn-comparar').attr("href", link);
                var countem = $(this).find('em').length;
                if (countem == 2) {
                    $(this).find('em').first().addClass('antes');
                    $(this).find('em').last().addClass('ahora');
                }
            });
        }
    },
    goTop: {
        resetGoToTopPage: function(){
          goToTopPage = function() {}
        }
    }
}

$(window).load(function(){
    if($('body').hasClass('departamento') || $('body').hasClass('categoria') || $('body').hasClass('resultado-busca')){
        if(document.location.href.indexOf('O=') > -1){
            setTimeout(
            function(){
                $('#content.list .right .main').addClass('load');
            }, 500); 
        }else{
            $('#content.list .right .main').addClass('load'); 
        }  
    }


});





$(document).ajaxStop(function(){
    $('.ajax-content-loader #login').click(function(){
        console.log('login');
    });

    if(document.location.pathname == "/almohadas-serta-y-beauturest-julio-50"){
            $(".resultado-busca .module.title .sup .descrip").text('Almohadas Serta y Beautyrest');
        } 
  
    $('.welcome').addClass('active-login');
    if (!$('#login').length) {
        setUserName();
    }

    //Menu Perfil Desplegable

    $( ".active-sucess, .user-menu__content" ).hover(function(e) {
         $('.active-sucess').toggleClass('active');
    });

    $('.active-sucess').on('click', function(e) {
        // e.stopPropagation();
        // $(this).toggleClass('active');
    });

    $('body,html').on('click', function(e) {
        //$('.active-sucess').removeClass('active');
    });
    
    if($('body').hasClass('departamento') || $('body').hasClass('categoria') || $('body').hasClass('resultado-busca')){
        //Medialab.flag.formatPrecioDescuento(); 
    }

});

$(document).ready(function(){
    $('#header .in').mCustomScrollbar();
    setTimeout(
    function(){
        if(document.location.pathname == "/dormitorio" || document.location.pathname == "/dormitorio/"){
            $("#content.list .left .menu-departamento .search-multiple-navigator fieldset.filtro_nivel-de-firmeza").before('<fieldset class="refino even Filtros filtro_estructura-interna"> <h5 class=" even Filtros">Estructura interna</h5> <div class=""> <label class="sr_hibrido" title="Híbrido" index="0"><input rel="fq=specificationFilter_23:H%c3%adbrido" class="multi-search-checkbox" type="checkbox" name="H%c3%adbrido" value="Híbrido">Híbrido <span class="sr_box"></span><span class="sr_box2"></span></label> <label class="sr_latex" title="Látex" index="1"><input rel="fq=specificationFilter_23:L%c3%a1tex" class="multi-search-checkbox" type="checkbox" name="L%c3%a1tex" value="Látex">Látex <span class="sr_box"></span><span class="sr_box2"></span></label> <label class="sr_resortes-bonnell" title="Resortes Bonnell" index="2"><input rel="fq=specificationFilter_23:Resortes+Bonnell" class="multi-search-checkbox" type="checkbox" name="Resortes+Bonnell" value="Resortes Bonnell">Resortes Bonnell <span class="sr_box"></span><span class="sr_box2"></span></label> <label class="sr_resortes-pocket" title="Resortes Pocket" index="3"><input rel="fq=specificationFilter_23:Resortes+Pocket" class="multi-search-checkbox" type="checkbox" name="Resortes+Pocket" value="Resortes Pocket">Resortes Pocket <span class="sr_box"></span><span class="sr_box2"></span></label> <label class="sr_viscoelastico" title="Viscoelástico" index="4"><input rel="fq=specificationFilter_23:Viscoel%c3%a1stico" class="multi-search-checkbox" type="checkbox" name="Viscoel%c3%a1stico" value="Viscoelástico">Viscoelástico <span class="sr_box"></span><span class="sr_box2"></span></label> </div></fieldset>');
        }
        if(document.location.pathname == "/dormitorio/colchones" || document.location.pathname == "/dormitorio/colchones/"){
            $("#content.list .left .menu-departamento .search-multiple-navigator fieldset.filtro_marca").after('<fieldset class="refino Filtros filtro_tamaño"> <h5 class=" Filtros">Tamaño</h5> <div class=""> <label class="sr_cuna" title="Cuna" index="0"><input rel="fq=specificationFilter_21:Cuna" class="multi-search-checkbox" type="checkbox" name="Cuna" value="Cuna">Cuna <span class="sr_box"></span><span class="sr_box2"></span></label> <label class="sr_1-plaza---90x190cm" title="1 Plaza - 90x190cm" index="1"><input rel="fq=specificationFilter_21:1+Plaza+-+90x190cm" class="multi-search-checkbox" type="checkbox" name="1+Plaza+-+90x190cm" value="1 Plaza - 90x190cm">1 Plaza - 90x190cm <span class="sr_box"></span><span class="sr_box2"></span></label> <label class="sr_1.5-plazas---105x190cm" title="1.5 Plazas - 105x190cm" index="2"><input rel="fq=specificationFilter_21:1.5+Plazas+-+105x190cm" class="multi-search-checkbox" type="checkbox" name="1.5+Plazas+-+105x190cm" value="1.5 Plazas - 105x190cm">1.5 Plazas - 105x190cm <span class="sr_box"></span><span class="sr_box2"></span></label> <label class="sr_2-plazas---135x190cm" title="2 Plazas - 135x190cm" index="3"><input rel="fq=specificationFilter_21:2+Plazas+-+135x190cm" class="multi-search-checkbox" type="checkbox" name="2+Plazas+-+135x190cm" value="2 Plazas - 135x190cm">2 Plazas - 135x190cm <span class="sr_box"></span><span class="sr_box2"></span></label> <label class="sr_queen-americano---153x203cm" title="Queen Americano - 153x203cm" index="4"><input rel="fq=specificationFilter_21:Queen+Americano+-+153x203cm" class="multi-search-checkbox" type="checkbox" name="Queen+Americano+-+153x203cm" value="Queen Americano - 153x203cm">Queen Americano - 153x203cm <span class="sr_box"></span><span class="sr_box2"></span></label> <label class="sr_queen-europeo---160x200cm" title="Queen Europeo - 160x200cm" index="5"><input rel="fq=specificationFilter_21:Queen+Europeo+-+160x200cm" class="multi-search-checkbox" type="checkbox" name="Queen+Europeo+-+160x200cm" value="Queen Europeo - 160x200cm">Queen Europeo - 160x200cm <span class="sr_box"></span><span class="sr_box2"></span></label> <label class="sr_king-americano---198x203cm" title="King Americano - 198x203cm" index="6"><input rel="fq=specificationFilter_21:King+Americano+-+198x203cm" class="multi-search-checkbox" type="checkbox" name="King+Americano+-+198x203cm" value="King Americano - 198x203cm">King Americano - 198x203cm <span class="sr_box"></span><span class="sr_box2"></span></label> <label class="sr_king-europeo---200x200cm" title="king Europeo - 200x200cm" index="7"><input rel="fq=specificationFilter_21:king+Europeo+-+200x200cm" class="multi-search-checkbox" type="checkbox" name="king+Europeo+-+200x200cm" value="king Europeo - 200x200cm">king Europeo - 200x200cm <span class="sr_box"></span><span class="sr_box2"></span></label> </div></fieldset><fieldset class="refino even Filtros filtro_estructura-interna"> <h5 class=" even Filtros">Estructura interna</h5> <div class=""> <label class="sr_hibrido" title="Híbrido" index="0"><input rel="fq=specificationFilter_23:H%c3%adbrido" class="multi-search-checkbox" type="checkbox" name="H%c3%adbrido" value="Híbrido">Híbrido <span class="sr_box"></span><span class="sr_box2"></span></label> <label class="sr_latex" title="Látex" index="1"><input rel="fq=specificationFilter_23:L%c3%a1tex" class="multi-search-checkbox" type="checkbox" name="L%c3%a1tex" value="Látex">Látex <span class="sr_box"></span><span class="sr_box2"></span></label> <label class="sr_resortes-bonnell" title="Resortes Bonnell" index="2"><input rel="fq=specificationFilter_23:Resortes+Bonnell" class="multi-search-checkbox" type="checkbox" name="Resortes+Bonnell" value="Resortes Bonnell">Resortes Bonnell <span class="sr_box"></span><span class="sr_box2"></span></label> <label class="sr_resortes-pocket" title="Resortes Pocket" index="3"><input rel="fq=specificationFilter_23:Resortes+Pocket" class="multi-search-checkbox" type="checkbox" name="Resortes+Pocket" value="Resortes Pocket">Resortes Pocket <span class="sr_box"></span><span class="sr_box2"></span></label> <label class="sr_viscoelastico" title="Viscoelástico" index="4"><input rel="fq=specificationFilter_23:Viscoel%c3%a1stico" class="multi-search-checkbox" type="checkbox" name="Viscoel%c3%a1stico" value="Viscoelástico">Viscoelástico <span class="sr_box"></span><span class="sr_box2"></span></label> </div></fieldset><fieldset class="refino Filtros filtro_nivel-de-firmeza"> <h5 class=" Filtros">Nivel de firmeza</h5> <div class=""> <label class="sr_firme" title="Firme" index="0"><input rel="fq=specificationFilter_24:Firme" class="multi-search-checkbox" type="checkbox" name="Firme" value="Firme">Firme <span class="sr_box"></span><span class="sr_box2"></span></label> <label class="sr_medio" title="Medio" index="1"><input rel="fq=specificationFilter_24:Medio" class="multi-search-checkbox" type="checkbox" name="Medio" value="Medio">Medio <span class="sr_box"></span><span class="sr_box2"></span></label> <label class="sr_suave" title="Suave" index="2"><input rel="fq=specificationFilter_24:Suave" class="multi-search-checkbox" type="checkbox" name="Suave" value="Suave">Suave <span class="sr_box"></span><span class="sr_box2"></span></label> </div></fieldset>');
        }
        if(document.location.pathname == "/dormitorio/cama-americana" || document.location.pathname == "/dormitorio/cama-americana/"){
            $("#content.list .left .menu-departamento .search-multiple-navigator fieldset.filtro_nivel-de-firmeza").before('<fieldset class="refino even Filtros filtro_estructura-interna"> <h5 class=" even Filtros">Estructura interna</h5> <div class=""> <label class="sr_hibrido" title="Híbrido" index="0"><input rel="fq=specificationFilter_23:H%c3%adbrido" class="multi-search-checkbox" type="checkbox" name="H%c3%adbrido" value="Híbrido">Híbrido <span class="sr_box"></span><span class="sr_box2"></span></label> <label class="sr_latex" title="Látex" index="1"><input rel="fq=specificationFilter_23:L%c3%a1tex" class="multi-search-checkbox" type="checkbox" name="L%c3%a1tex" value="Látex">Látex <span class="sr_box"></span><span class="sr_box2"></span></label> <label class="sr_resortes-bonnell" title="Resortes Bonnell" index="2"><input rel="fq=specificationFilter_23:Resortes+Bonnell" class="multi-search-checkbox" type="checkbox" name="Resortes+Bonnell" value="Resortes Bonnell">Resortes Bonnell <span class="sr_box"></span><span class="sr_box2"></span></label> <label class="sr_resortes-pocket" title="Resortes Pocket" index="3"><input rel="fq=specificationFilter_23:Resortes+Pocket" class="multi-search-checkbox" type="checkbox" name="Resortes+Pocket" value="Resortes Pocket">Resortes Pocket <span class="sr_box"></span><span class="sr_box2"></span></label> <label class="sr_viscoelastico" title="Viscoelástico" index="4"><input rel="fq=specificationFilter_23:Viscoel%c3%a1stico" class="multi-search-checkbox" type="checkbox" name="Viscoel%c3%a1stico" value="Viscoelástico">Viscoelástico <span class="sr_box"></span><span class="sr_box2"></span></label> </div></fieldset>');
        }      
    }, 100);
    

    Medialab.goTop.resetGoToTopPage();
    Medialab.matchMovilDesktop.bodyclassNav();
    Medialab.bxslider.slider();
    Medialab.carrouselColeccion.carrusel();
    Medialab.validateForm.onlyNumbers();
    Medialab.validateForm.onlyLetters();
    Medialab.navegacionMovil.header();
    Medialab.navegacionMovil.menuMovil();
    Medialab.navegacionDesktop.fixed();
    Medialab.navegacionSearch.buscador();
    Medialab.textoPlaceholder.cambiar();
    Medialab.mostrarAcordeon.desplegar();
    Medialab.mostrarAcordeon.desplegarPrimero();

    if ($('#formulario-libros').length) {
        Medialab.ubigeo.filtrarprovincias();
        Medialab.ubigeo.filtrardistrito();
    }
    if ($('.producto').length) {
        Medialab.mostrarTextoReferencia.boxtarima() ;
        Medialab.seleccinaProducto.medida();
        Medialab.seleccinaProducto.ocultar();
        Medialab.especificacionProducto.mostrar();
        Medialab.mostrarProducto.medida();
        Medialab.mostrarDoblePrecio.doble();
        Medialab.mostrarRegalo.descripcion();
    }

    $('#tipo-documento').change(function() {
        if ($(this).val() == 'menor') {
            $('.num-documento').hide();
        } else {
            $('.num-documento').show();
        }
        if ($(this).val() == 'dni') {
            $('#numedoc').attr('maxlength', '8');
        }

        if ($(this).val() == 'carnet') {
            $('#numedoc').attr('maxlength', '9');
        }
    });

    if ($('.legales').length) {
        Medialab.tabLegales.mostrar();
        Medialab.mostrarFecha.fecha();
    }

    if ($('.corpo-comparacao').length) {
        Medialab.comparar.tabla();
    }

    if ($('.news').length) {
        $(".btn-suscribete").fancybox({
            wrapCSS: 'fancybox-suscribete-cliente',
            padding: 0,
        });
    }

    $('.search-multiple-navigator fieldset label').on('click', function() {
       $('.vtexSr-overlay').remove();
       // $('.vtexSr-overlay').hide();
    });


    $('.resultado-busca-filtro select').on('change', function() {
      // $('.vtexSr-overlay').show();
    })

    if ($('.compare').length) {
        var celdaDes = $('.corpo-comparacao tr.atributos.Descripción td'); 
        celdaDes.wrapInner( '<span class="box-tabla"></span>');

        var celdaEst = $('.corpo-comparacao tr.atributos.Estructura td'); 
        celdaEst.wrapInner( '<span class="box-tabla"></span>');
    }

    if ($('.menu-departamento').length) {
        //agregar clase nombre de categoria en contenedor
        var nombrecat = $('.menu-departamento .search-multiple-navigator h3').text();
        $('#main').addClass(nombrecat);
    }


    /* Eliminar cantidad en productos*/
    $('#content.list .left .menu-departamento .search-single-navigator ul li a').each(function(index, element) {
        var heading = $(element);
        var word_array, last_word, first_part;

        word_array = heading.html().split(/\s+/); // split on spaces
        last_word = word_array.pop();             // pop the last word
        first_part = word_array.join(' ');        // rejoin the first words together

        heading.html([first_part, ' <span class="last-word">', last_word, '</span>'].join(''));
    });


    /* Filtro Marca*/

   if($('body').hasClass('resultado-busca')){
       //agregar active marca seleccionada
       var marca = $('.bread-crumb .last a').text();
       var listamarca= $('.search-multiple-navigator .refino-marca label a');
       listamarca.each(function(key,data){
            nom = $(this).text();
            if (marca.trim() == nom.trim()) {
                $(this).parent().addClass('active');
                // console.log(nom);
            }
        });

       //cambiar url según marca

       listamarca.each(function(key,data){
            nom = $(this).text();
            if (marca.trim() == 'Drimer') {
                // console.log('soy drimer');

            } else if(marca.trim() == 'Serta')  {
                // console.log('soy serta');

            } else {
                // console.log('otra marca');
            }
        });

       //cambiar url categoria
       var codBrandDrimer = 2000003;
       var codBrandSerta = 2000007;
       var codBrandBeautyrest = 2000004;
       var codBrandContinental = 2000006;  
       var codBrandTechnodream  = 2000005;

       var linkMarca= $('.search-categorias label a');
       linkMarca.each(function(key,data){
            var oldUrl = $(this).attr('href');
            var newUrlDrimer = oldUrl+codBrandDrimer;
            var newUrlSerta = oldUrl+codBrandSerta;
            var newUrlBeautyrest = oldUrl+codBrandBeautyrest;
            var newUrlContinental = oldUrl+codBrandContinental;
            var newUrlTechnodream = oldUrl+codBrandTechnodream;

            // console.log(oldUrl);
            // console.log(newUrlSerta);

            if (marca.trim() == 'Drimer') {
                $(this).attr("href", newUrlDrimer); 

            } else if(marca.trim() == 'Serta') {
                $(this).attr("href", newUrlSerta); 

            } else if(marca.trim() == 'Beautyrest Simmons') {
                $(this).attr("href", newUrlBeautyrest); 

            } else if(marca.trim() == 'Continental') {
                $(this).attr("href", newUrlContinental); 

            } else if(marca.trim() == 'Technodream') {
                $(this).attr("href", newUrlTechnodream); 

            }

        });


        //mostrar texto busqueda en título
        var wordSearch = $('.searchResultsTime:first-child .resultado-busca-termo .value').html();
        var titlere = $('.title .descrip');
        titlere.text(wordSearch);

    }



// var primerProduct = $('.size-product ul li:first').find('.product-field ul li').text(); //king
// var primerSKU = $('.size-product ul li:first').find('.item').attr("data-sku"); // 30
// var idSKU = $('.product-main-view  #___rc-p-id').attr("value"); // 27
// var lista = $('.size-product .box-plazas ul li');
// $.each(lista, function(index, value) {
//     var atributo = $(this).children("a").attr("data-sku");
//     if (atributo == idSKU) {
//         var nombreFinal1 = $(this).find('.item-relacionado ul li').text();
//     }
//     $('.box-plazas h2').text(nombreFinal1);
// });


    //Page Orders

    $(document).ajaxStop(function(){


        if($('body').hasClass('producto')){
            var container = $('.dm_mobile  #include #image');
            var wrappers = '<div id="producto-movil-slider" class="producto-movil-slider"><div class="swiper-container"><div class="swiper-wrapper"></div></div><div id="js-prev1" class="swiper-button-next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 44"><path d="M27,22L27,22L5,44l-2.1-2.1L22.8,22L2.9,2.1L5,0L27,22L27,22z"></svg></div><div id="js-next1" class="swiper-button-prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 44"><path d="M0,22L22,0l2.1,2.1L4.2,22l19.9,19.9L22,44L0,22L0,22L0,22z"></svg></div></div>';
            //container.append(wrappers);
            container.html(wrappers);
            $( ".dm_mobile .image-zoom" ).remove();
            $( ".dm_mobile #show .left" ).remove();
            $( ".dm_mobile #show .right" ).remove();
            $( ".dm_mobile #show .right" ).remove();
           
            
            var imgProducto = $('.thumbs li img');
            var innerswiper = $('.dm_mobile .swiper-wrapper');
            
            imgProducto.each(function(key,data){
                cad = $(this).attr('src');  
                cambiosize =cad.replace('140-116','700-468');
                innerswiper.append('<div class="swiper-slide"><img src='+ cambiosize+ ' alt=""/></div>');
                $( ".dm_mobile  .apresentacao .thumbs" ).remove();
                
            });

            //si hay 1 elemento ocultar flechas slider
            var item = $('.swiper-slide');
            if (item.length == 1) {
                $( ".swiper-button-next" ).remove();
                $( ".swiper-button-prev" ).remove();
            }

            var swiper = new Swiper('.swiper-container', {
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },
            });
        }




    });


    //Correción de Palabras:  https://www.Medialab.pe/almohadas/latex
    //Estableciendo tildes a categorias
    // var categorias = $('.search-single-navigator a,.search-multiple-navigator a,.bread-crumb a');
    // var itemsCategorias = {
    //     'Sartenes electricos' :'Sartenes eléctricos',
    //     'Batidoras de inmersion' : 'Batidoras de inmersión',
    //     'Cafe y mas' : 'Café y más',
    //     'Purificacion de agua' : 'Purificación de agua',
    //     'Envasadora al vacio' : 'Envasadora al vacío',
    //     'Coleccion Renate' : 'Colección Renate'
    // };
    // categorias.each(function(){
    //     if (itemsCategorias.hasOwnProperty($(this).attr('title'))) {
    //         $(this).text(itemsCategorias[$(this).attr('title')]);
    //     }
    // });

    var titulo = $('.titulo-sessao').text();
    var textotitulo = {
        'Latex': 'Látex',
        'Viscoelastico': 'Viscoelástico'
    };

    if (textotitulo[titulo]) {
        $('.titulo-sessao').text(textotitulo[titulo]);
    }
    


    Medialab.flag.formatPrecioDescuento();

    var count = 1;
    var cantProducto = $('.CB .insert-sku-quantity');
    cantProducto.wrapAll("<div class='cantidad-producto' />");
    cantProducto.after("<div class='plus' />");
    cantProducto.before("<div class='minus' />");
    // var valorPro = cantProducto.val();
    var valorProducto = cantProducto.attr("value");

    $('.plus').on('click', function(e) {
        e.preventDefault();
        if (count <= 9) {
            count++;
            cantProducto.attr("value", count);
        }
        $('.CB .buy-button').attr("href", nuevoUrl());

    });

    $('.minus').on('click', function(e) {
        e.preventDefault();
        if (count >= 2) {
            count--;
            cantProducto.attr("value", count);
        }
        $('.CB .buy-button').attr("href", nuevoUrl());
    });

    $.miniCart();

    $('#menu-sesion').on('click', function(e) {
        $("#login").trigger('click');
    });
    if ($('.producto .brandName')) {
        var urlBrand = $('.brandName a').attr('href');
        if (urlBrand) {
            //var separeBrand = urlBrand.split("/");
            //var ultimoBrand = separeBrand[separeBrand.length - 1];
            //$('.brandName a').attr("href", '/'+ultimoBrand);
            $('.brandName a').attr("href", '#');
        }
    }
});


function formatoPrecioOrder(){  
        setTimeout(function(){ 
            // console.log('function formatoPrecioOrder');
            var envio = $('.myo-product-price span, .myo-product-total-price span, .h4-plus .cf .w-50.tr span, .h4-plus .cf .w-40.tr span, .h4-plus .mb3 .dib .db > span, .h4-plus .mb3 .dib .dib > span, .myo-order-header .fr.w-third-m .mid-gray > span, .myo-order-product .mid-gray .db.mt0.mb2.f6.fw6 > span');
            var cadena = '';
            var texto ='';
            var cad ='';
            var textosplit = '';
            envio.each(function(key,data){
                cad = $(this);
                texto = cad.text(); 
                texto = texto.replace(',','coma');
                texto =texto.replace('.',',');
                texto =texto.replace('coma','.');
                cad.text(texto);
                // var textosplit = texto.replace(',','.');
                // var indice = textosplit.split(".");
                // var size = indice.length;
                // if (size == '3') {
                //  cad.text(indice[0]+','+indice[1]+'.'+indice[2]);
                // } else if (size == '2') {
                //  cad.text(indice[0]+'.'+indice[1]);
                // }                    
            });
        }, 500);
};


function formatoTextoOrder(){  
        setTimeout(function(){ 
            $('.box-orders .flex-row-l .mr2  span').addClass('texto-habiles');
            // console.log('function formatoTextoOrder');
            var envio = $('.texto-habiles');
            var cadena = '';
            var texto ='';
            var cad ='';
            envio.each(function(key,data){
                cad = $(this);
                cadena = cad.text().split(" "); 
                texto = cad.text(); 
                if (cadena.indexOf('hábiles') != -1) {
                    texto = texto.replace('hábiles','útiles');
                    cad.text(texto);
                }       
            });
        }, 1000);


        setTimeout(function(){ 
            $('.box-orders .flex-row-l .mr2 ').addClass('texto-entrega');
            // console.log('function formatoTextoOrder');
            var envio = $('.texto-entrega');
            var cadena = '';
            var texto ='';
            var cad ='';
            envio.each(function(key,data){
                cad = $(this);
                cadena = cad.text().split(" "); 
                texto = cad.text(); 
                if (cadena.indexOf('Entregue') != -1) {
                    texto = texto.replace('Entregue','Entrega');
                    cad.text(texto);
                }       
            });
        }, 1000);


};

function nuevoUrl() {
    var cantProducto = $('.CB .insert-sku-quantity');
    var valorProducto = cantProducto.attr("value");
    var btnComprar = $('.CB .buy-button');
    var urlProducto = $('.CB .buy-button').attr("href");
    var urlProductoSplit = btnComprar.attr("href");
    var separe = urlProducto.split("&");
    var produ = '';
    var produnuevo = 'qty=' + valorProducto;
    separe.forEach(function(element) {
        if (element.search('qty=') != -1) {
            produ = element;
        }
    });
    return urlProducto.replace(produ, produnuevo);
}
var onChangeActual = $(".resultado-busca-filtro select").attr("onchange");
function callbackSearch($donde) {
    if ($donde == "shelfCallback" || $donde == "ajaxCallback") {
        //Medialab.flag.formatPrecioDescuento();
        callbackFiltersSearch("");
    }
}
function callbackFiltersSearch($urlParameters) {
    var $urlSplit = window.location.href.split("filtro=");
    if ($urlSplit.length > 1) {
        $urlParameters = $urlSplit[1];
        $urlParameters = $urlParameters.replace("%20active", "").replace(" active", "").replace(" closed", "").replace("active closed", "")
        if ($(".resultado-busca-filtro").length > 0) {
            //var onChangeActual = $(".resultado-busca-filtro select").attr("onchange");
            $(".resultado-busca-filtro select").attr("onchange", onChangeActual + "+'&filtro=" + $urlParameters + "'");
        }
    }
}
function setUserName(){
    if ($('.active-login').length) {
        var welcomer = $('.active-login').html();
        var res = $.trim(welcomer).split(" ");
        var correo = res[1].split("<em>")[0];
        var user = correo.split("@")[0];
        var replacewr = welcomer.replace(correo, user);
        $('.active-login').html(replacewr);
        $('.active-login').addClass('active-sucess');
        $('.active-sucess').after(' <div class="user-menu__content"><a class="user-menu__link user-datos" href="/account">Mis Datos</a><a class="user-menu__link user-compras" href="/account/orders">Mis Compras</a><a class="user-menu__link user-menu__link--logout" href="/no-cache/user/logout">Cerrar Sesión</a></div>');
    }
}
var goToTopPage = function() {};

/* Swiper Slider */

// vtexjs.checkout.getOrderForm()
//   .done(function(orderForm) {
//      if ($('.orders').length) {
//        console.log('Alguem atualizou o orderForm! ');
//     }
// });


$(window).on('hashchange', function(){
    if ($('.orders').length) {
        formatoPrecioOrder();
        formatoTextoOrder();
    }
});

$(window).on('orderFormUpdated.vtex', function(evt, orderForm) {
  // alert('Alguem atualizou o orderForm!');
  // console.log(orderForm);
  formatoPrecioOrder();
  formatoTextoOrder();
  // $('.accordion-heading').addClass('callalle');

});

