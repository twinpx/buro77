(function($) {

	function validateForm( $form ) {
		var result = {},
				$email = $form.find( "[type=email]" ),
				$text = $form.find( "[type=text]" ),
				$textarea = $form.find( "textarea" ),
				$tel = $form.find( "[type=tel]" ),
				$submitButton = $form.find( "button[type=submit]" );
		
		function showError( $elem ) {
			$elem.closest( ".ui-field-contain" ).addClass( "i-has-error" );
			result.hasError = true;
		}
		
		function removeError( $elem ) {
			$elem.closest( ".ui-field-contain" ).removeClass( "i-has-error" );
		}
		
		if ( $submitButton.hasClass( "i-error" ) ||
				 $submitButton.hasClass( "i-disabled" )) {
		
			result.hasError = true;
			return result;
		}
		
		$email.each( function() {
			var $this = $( this );
			if ( $this.val() === "" ) {
				showError( $this );
			} else {
				removeError( $this );
			}
		});
		
		$text.each( function() {
			var $this = $( this );
			if ( $this.val() === "" ) {
				showError( $this );
			} else {
				removeError( $this );
			}
		});
		
		$textarea.each( function() {
			var $this = $( this );
			if ( $this.val() === "" ) {
				showError( $this );
			} else {
				removeError( $this );
			}
		});
		
		$tel.each( function() {
			var $this = $( this );
			if ( $this.val() === "" ) {
				showError( $this );
			} else {
				removeError( $this );
			}
		});
		
		if ( result.hasError ) {
			$submitButton.removeClass( "i-disabled" ).addClass( "i-error" );
		}
		
		return result;
	}
	
	function clickButton(e) {
		var $this = $( this ),
				$form = $this.closest( "form" ),
				validateObj = validateForm( $form );
		
		if ( validateObj.hasError ) {
			e.preventDefault();
			return;
		}
	}
	
	function submitForm(e) {
		e.preventDefault();
		
		var $form = $( "#contactForm form" ),
				url = $form.attr( "action" ),
				type = $form.attr( "method" );
		
		$.ajax({
			url: url,
			type: type,
      data: $form.serialize(),
			dataType: "json",
			success: function( data ) {
				if ( data.success ) {
					$( "#contactForm" ).addClass( "i-success" );
          setTimeout( function() {
            reset( $form );
            $( "#contactForm" ).removeClass( "i-success" );
          }, 3000 );
				}
			},
			error: function(a,b,c) {
        if ( !window.console ) {
          return;
        }
        console.log(a);
        console.log(b);
        console.log(c);
      }
		});
	}
  
  function reset( $form ) {
    $form.find( 'input',  'textarea' ).val( '' );
  }
	
	function disableSubmitButton() {
		var emptyFlag = true,
				$elements = $( "#contactForm input, #contactForm textarea" ),
				$submitButton = $( "#contactForm button[type=submit]" );
		
		$elements
			.each( function() {
				if ( $( this ).val() !== "" ) {
					emptyFlag = false;
				}
			});
		
		if ( emptyFlag ) {
			$submitButton.addClass( "i-disabled" ).removeClass( "i-error" );
		} else {
			$submitButton.removeClass( "i-disabled" ).removeClass( "i-error" );
		}
	}
	
	$( function() {
		
		disableSubmitButton();
		
		$( "#contactForm input, #contactForm textarea" )
			.keyup( disableSubmitButton );
		
		$( "#contactForm [type=submit]" ).click( clickButton );
		
		$( "#contactForm form" ).submit( submitForm );
		
	});
}( jQuery ));