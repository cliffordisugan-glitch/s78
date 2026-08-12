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
		        <!-- FIXED: Added "message" to v-model -->
		        <textarea v-model="message" class="form-control custom-underline-input px-0" id="inquiryText" rows="3" placeholder="How can I help you?"></textarea>
		    </div>

		    <!-- Submit Button -->
		    <!-- FIXED: Proper ternary operator and closing brackets -->
		    <button type="submit" class="btn w-100 py-3 fw-semibold text-uppercase tracking-wide text-white border-0" id="button" :disabled="isLoading">
                {{ isLoading ? "Sending..." : "Send Inquiry" }}
		    </button>
		    
		  </form>
		</div>
	</section>
	<!-- Contacts Start -->
</template>

<!-- FIXED: Changed to <script setup> -->
<script setup>
	import { ref } from 'vue';
	// FIXED: Corrected Notyf import
	import { Notyf } from 'notyf'; 
	import 'notyf/notyf.min.css';

	const notyf = new Notyf();
	const WEB3FORMS_ACCESS_KEY = "263d6c45-7cfb-4cdb-9605-bc79236ea53a";
	const subject = "New message from Portfolio Contact Form";

	const name = ref("");
	// FIXED: Changed second 'name' to 'email'
	const email = ref(""); 
	const message = ref("");
	const isLoading = ref(false);

	const submitForm = async () => {
		isLoading.value = true;
		try {
            // FIXED: Typo 'fecth' to 'fetch'
			const response = await fetch("https://api.web3forms.com/submit", {
				method: "POST",
                // FIXED: Typo 'header' to 'headers'
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
				notyf.success("Message Sent!");
                // Optional: Clear form after success
                name.value = "";
                email.value = "";
                message.value = "";
			}
		} catch (error) {
			console.log(error);
			isLoading.value = false;
			notyf.error("Failed to send message.");
		}
	}
</script>