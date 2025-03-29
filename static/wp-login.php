<!DOCTYPE html>
<html lang="en-US">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>Log In &lsaquo; matdoes.dev &#8212; WordPress</title>
		<meta name="robots" content="noindex, follow" />
		<link
			rel="stylesheet"
			id="login-css"
			href="/wp-admin/css/login.min.css?ver=6.6.2"
			type="text/css"
			media="all"
		/>
		<link
			rel="stylesheet"
			id="buttons-css"
			href="/wp-includes/css/buttons.min.css?ver=6.6.2"
			type="text/css"
			media="all"
		/>
		<link
			rel="stylesheet"
			id="forms-css"
			href="/wp-admin/css/forms.min.css?ver=6.6.2"
			type="text/css"
			media="all"
		/>
		<meta name="referrer" content="strict-origin-when-cross-origin" />
		<meta name="viewport" content="width=device-width" />
	</head>
	<body class="login no-js login-action-login wp-core-ui locale-en-us">
		<div id="login">
			<h1><a href="https://wordpress.org/">Powered by WordPress</a></h1>

			<form name="loginform" id="loginform" action="/admin" method="get">
				<p>
					<label for="user_login">Username or Email Address</label>
					<input
						type="text"
						id="user_login"
						class="input"
						value=""
						size="20"
						autocapitalize="off"
						autocomplete="username"
						required="required"
					/>
				</p>

				<div class="user-pass-wrap">
					<label for="user_pass">Password</label>
					<div class="wp-pwd">
						<input
							type="password"
							id="user_pass"
							class="input password-input"
							value=""
							size="20"
							autocomplete="current-password"
							spellcheck="false"
							required="required"
						/>
						<button
							type="button"
							class="button button-secondary wp-hide-pw hide-if-no-js"
							data-toggle="0"
							aria-label="Show password"
						>
							<span class="dashicons dashicons-visibility" aria-hidden="true"></span>
						</button>
					</div>
				</div>
				<p class="forgetmenot">
					<input name="rememberme" type="checkbox" id="rememberme" value="forever" />
					<label for="rememberme">Remember Me</label>
				</p>
				<p class="submit">
					<input
						type="submit"
						id="wp-submit"
						class="button button-primary button-large"
						value="Log In"
					/>
				</p>
			</form>

			<p id="nav">
				<a class="wp-login-lost-password" href="/wp-login.php?action=lostpassword"
					>Lost your password?</a
				>
			</p>
			<script type="text/javascript">
				/* <![CDATA[ */
				function wp_attempt_focus() {
					setTimeout(function () {
						try {
							d = document.getElementById('user_login')
							d.focus()
							d.select()
						} catch (er) {}
					}, 200)
				}
				wp_attempt_focus()
				if (typeof wpOnload === 'function') {
					wpOnload()
				}
				/* ]]> */
			</script>
			<p id="backtoblog">
				<a href="/">&larr; Go to matdoes.dev</a>
			</p>
			<div class="privacy-policy-page-link">
				<a class="privacy-policy-link" href="/privacy-policy" rel="privacy-policy">Privacy Policy</a
				>
			</div>
		</div>
	</body>
</html>
