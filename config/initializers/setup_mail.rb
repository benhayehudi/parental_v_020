ActionMailer::Base.smtp_settings = {
  :address              => "smtp.sparkpostmail.com",
  :port                 => 587,
  :user_name            => "SMTP_Injection",
  :password             => ENV['PARENTAL_MAIL_KEY']
  :authentication       => :login,
  :format               => "html",
  :enable_starttls_auto => true,

}
ActionMailer::Base.default_url_options[:host] = "parental.life"
ActionMailer::Base.delivery_method = :smtp
