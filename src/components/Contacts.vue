<template>
	<!-- Contacts Start -->
	<section id="contact" class="py-5">
		<h1 class="text-center mb-4" id="contactscaption">Let's Start a Conversation</h1>

		<div class="col-md-8 text-light text-center mx-auto py-5">
			<img src="/images/Facebook_Logo_2023.png" class="rounded-circle socmed" alt="Facebook">
			<img src="/images/twitter-new-logo-twitter-icons-new-twitter-logo-x-2023-x-social-media-icon-free-png.png" class="rounded-circle socmed" alt="X / Twitter">
			<img src="/images/instagram-logo-instagram-icon-transparent-free-png.png" class="rounded-circle socmed" alt="Instagram">
			<img src="/images/images.png" class="rounded-circle socmed" alt="Social Media">
		</div>

		<!-- Form Container Card -->
		<div class="card p-4 border-0 rounded-4 shadow-sm mx-auto" id="formbox">
			<form @submit.prevent="submitForm">

				<!-- Full Name Field -->
				<div class="mb-4 text-start">
					<label for="fullName" class="form-label small fw-bold text-uppercase tracking-wider custom-form-label">Full Name</label>
					<input type="text" v-model="name" class="form-control custom-underline-input px-0" id="fullName" placeholder="Enter your name" required>
				</div>

				<!-- Email Field -->
				<div class="mb-4 text-start">
					<label for="emailAddr" class="form-label small fw-bold text-uppercase tracking-wider custom-form-label">Email</label>
					<input type="email" v-model="email" class="form-control custom-underline-input px-0" id="emailAddr" placeholder="hello@example.com" required>
				</div>

				<!-- Inquiry Field -->
				<div class="mb-5 text-start">
					<label for="inquiryText" class="form-label small fw-bold text-uppercase tracking-wider custom-form-label">Inquiry</label>
					<textarea v-model="message" class="form-control custom-underline-input px-0" id="inquiryText" rows="3" placeholder="How can I help you?" required></textarea>
				</div>

				<!-- Web3Forms Free Honeypot Spam Protection (Hidden from real users) -->
				<input type="checkbox" name="botcheck" class="hidden" style="display: none;">

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
import { ref } from 'vue';
import { Notyf } from 'notyf';

// Initialize Notyf instance once
const notyf = new Notyf({
	duration: 4000,
	position: { x: 'right', y: 'top' },
	dismissible: true
});

const WEB3FORMS_ACCESS_KEY = "263d6c45-7cfb-4cdb-9605-bc79236ea53a";
const subject = "New message from Portfolio Contact Form";

const name = ref("");
const email = ref("");
const message = ref("");
const isLoading = ref(false);

const submitForm = async () => {
	isLoading.value = true;

	try {
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
			notyf.success("Message Sent Successfully!");
			// Clear inputs on success
			name.value = "";
			email.value = "";
			message.value = "";
		} else {
			notyf.error(result.message || "Failed to send message.");
		}
	} catch (error) {
		console.error("Submission error:", error);
		notyf.error("Network error. Please try again later.");
	} finally {
		isLoading.value = false;
	}
};
</script>