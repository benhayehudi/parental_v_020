ActionMailer::Base.smtp_settings = {
  :address              => "smtp.sparkpostmail.com",
  :port                 => 587,
  :user_name            => "SMTP_Injection",
  :password             => Rails.application.secrets.api_key,
  :authentication       => :login,
  :format               => "html",
  :enable_starttls_auto => true,

}
ActionMailer::Base.default_url_options[:host] = "localhost:3000"
ActionMailer::Base.delivery_method = :smtp
