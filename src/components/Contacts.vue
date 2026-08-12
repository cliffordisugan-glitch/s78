<template>
	<!-- Contacts Start -->
	<section id="contact" class="py-5">
		<h1 class="text-center mb-4" id="contactscaption">Let's Start a Conversation</h1>

		<div class="col-md-8 text-light text-center mx-auto py-5">
			<img src="/images/Facebook_Logo_2023.png" class="rounded-circle socmed">
			<img src="/images/twitter-new-logo-twitter-icons-new-twitter-logo-x-2023-x-social-media-icon-free-png.png" class="rounded-circle socmed">
			<img src="/images/instagram-logo-instagram-icon-transparent-free-png.png" class="rounded-circle socmed">
			<img src="/images/images.png" class="rounded-circle socmed">
		</div>

		<!-- Form Container Card -->
		<div class="card p-4 border-0 rounded-4 shadow-sm mx-auto" id="formbox">
		  <form @submit.prevent="submitForm">

			<!-- Full Name Field -->
			<div class="mb-4 text-start">
				<label for="fullName" class="form-label small fw-bold text-uppercase tracking-wider custom-form-label">Full Name</label>
				<input type="text" v-model="name" class="form-control custom-underline-input px-0" id="fullName" placeholder="Enter your name">
			</div>

			<!-- Email Field -->
			<div class="mb-4 text-start">
				<label for="emailAddr" class="form-label small fw-bold text-uppercase tracking-wider custom-form-label">Email</label>
				<input type="email" v-model="email" class="form-control custom-underline-input px-0" id="emailAddr" placeholder="hello@example.com">
			</div>

			<!-- Inquiry Field -->
			<div class="mb-5 text-start">
				<label for="inquiryText" class="form-label small fw-bold text-uppercase tracking-wider custom-form-label">Inquiry</label>
				<textarea v-model="message" class="form-control custom-underline-input px-0" id="inquiryText" rows="3" placeholder="How can I help you?"></textarea>
			</div>
			 <div class="d-flex justify-content-end mt-2">
                                <div ref="recaptchaContainer"></div>
                            </div>
			<!-- Submit Button -->
			<button type="submit" class="btn w-100 py-3 fw-semibold text-uppercase tracking-wide text-white border-0" id="button" :disabled="isLoading">
				{{ isLoading ? "Sending..." : "Send Inquiry" }}
			</button>

		  </form>
		</div>
	</section>
	<!-- Contacts End -->
</template>


<script setup>
    import { ref, onMounted, onBeforeUnmount } from 'vue';
    import { Notyf } from 'notyf';
    import 'notyf/notyf.min.css';

    const notyf = new Notyf();
    const WEB3FORMS_ACCESS_KEY = "263d6c45-7cfb-4cdb-9605-bc79236ea53a"
    const subject = "New message from Portfolio Contact Form";

    const name = ref("");
    const email = ref("");
    const message = ref("")
    const isLoading = ref(false); 

    const submitForm = async() => {

        if (!recaptchaToken.value) {
            notyf.error("Please verify that you are not a robot.")
            return;
        }

        isLoading.value = true;
        try{
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: WEB3FORMS_ACCESS_KEY,
                    subject: subject,
                    name: name.value,
                    email: email.value,
                    message: message.value,
                })
            });
            const result = await response.json();

            if (result.success) {
                console.log(result);
                isLoading.value = false;
                notyf.success("Message Sent!")
            }
        } catch (error){
            console.log(error);
            isLoading.value = false;
            notyf.error("Failed to send message.")
        } finally {
            resetRecaptcha();
        }
    }


    const SITE_KEY = '6Lf7ToItAAAAAGZJj-xkxfpGq2SCRz8qUqiH0nhu';  // Replace with your site key

    const recaptchaContainer = ref(null);
    const recaptchaWidgetId = ref(null);
    const recaptchaToken = ref('');

    // Callback called by reCAPTCHA when successful
    function onRecaptchaSuccess(token) {
      recaptchaToken.value = token;
    }

    // Callback when expired
    function onRecaptchaExpired() {
      recaptchaToken.value = '';
    }

    // Function to render the reCAPTCHA widget
    function renderRecaptcha() {
      if (!window.grecaptcha) {
        console.error('reCAPTCHA not loaded');
        return;
      }

      recaptchaWidgetId.value = window.grecaptcha.render(recaptchaContainer.value, {
        sitekey: SITE_KEY,
        size: 'normal', // or 'compact'
        callback: onRecaptchaSuccess,
        'expired-callback': onRecaptchaExpired,
      });
    }

    // Function to reset reCAPTCHA 
    function resetRecaptcha() {
      if (recaptchaWidgetId.value !== null) {
        window.grecaptcha.reset(recaptchaWidgetId.value);
        recaptchaToken.value = '';
      }
    }



    onMounted(() => {
      // This code waits for the Google reCAPTCHA library to load, then renders the reCAPTCHA widget using onMounted hook. 
      // The widget is rendered with grecaptcha.render(), which requires a sitekey. 
      // Callback functions handle success and expiration events. 
      // reCAPTCHA is reset upon form submission to clear the token.
      const interval = setInterval(() => {
        if (window.grecaptcha && window.grecaptcha.render) {
          renderRecaptcha();
          clearInterval(interval);
        }
      }, 100);

      onBeforeUnmount(() => {
        clearInterval(interval);
      });
    });
</script>