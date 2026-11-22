/* ==========================================================
   script.js — interactions du portfolio (jQuery)
   Menu mobile, année automatique et validation du formulaire
   ========================================================== */

$(function () {
  // Année courante dans le pied de page
  $('#year').text(new Date().getFullYear());

  // Menu mobile
  var $toggle = $('#menu-toggle');
  var $menu = $('#menu');

  $toggle.on('click', function () {
    var isOpen = $menu.hasClass('hidden') === false;
    $menu.toggleClass('hidden', isOpen);
    $toggle.attr('aria-expanded', !isOpen);
    $toggle.attr('aria-label', isOpen ? 'Ouvrir le menu' : 'Fermer le menu');
  });

  // Fermer le menu après un clic sur un lien (mobile)
  $('.nav-link').on('click', function () {
    if (window.innerWidth < 768) {
      $menu.addClass('hidden');
      $toggle.attr('aria-expanded', 'false');
    }
  });

  // Formulaire de contact : validation simple
  $('#contact-form').on('submit', function (e) {
    e.preventDefault();
    var $feedback = $('#form-feedback');
    var $fields = $(this).find('input[required], textarea[required]');
    var valid = true;

    $fields.each(function () {
      var ok = $.trim($(this).val()) !== '';
      if (this.type === 'email') {
        ok = ok && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($(this).val());
      }
      $(this).toggleClass('border-red-500', !ok);
      if (!ok) valid = false;
    });

    if (valid) {
      $feedback.removeClass('text-red-400').addClass('text-vert')
               .text('Merci ! Votre message est prêt à être envoyé.');
      this.reset();
    } else {
      $feedback.removeClass('text-vert').addClass('text-red-400')
               .text('Merci de remplir tous les champs avec une adresse e-mail valide.');
    }
  });
});