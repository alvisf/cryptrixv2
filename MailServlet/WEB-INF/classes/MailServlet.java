import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.util.Properties;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;


// Extend HttpServlet class
public class MailServlet extends HttpServlet {
 
    private final String userName="";
    private final String password="";
    private String toAddress;
    private String subject;
    private String message;
    
   public void init() throws ServletException {
      toAddress = "";
        subject = "Testing Java mail";
       message = "Mail is sent successfully";
   }

   public void doGet(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {
      
      // Set response content type
      response.setContentType("text/html");
       
       
       Properties properties = new Properties();
        properties.put("mail.smtps.user",userName);
        properties.put("mail.smtps.host", "smtp.gmail.com");
        properties.put("mail.smtps.port", "465");
        properties.put("mail.smtps.starttls.enable","true");
        properties.put("mail.smtps.auth", "true");

        Session session = Session.getInstance(properties,
        new javax.mail.Authenticator()	{
            protected PasswordAuthentication getPasswordAuthentication()	{
                return new PasswordAuthentication(userName,password);
            }
        });
        //session.setDebug(true);

        // creates a new e-mail message
        try	{
            Message msg = new MimeMessage(session);
            msg.setFrom(new InternetAddress(userName));
            msg.addRecipient(Message.RecipientType.TO, new InternetAddress(toAddress));
            msg.setSubject(subject);
            msg.setText(message);

            // sends the email
            Transport transport = session.getTransport("smtps");
            transport.connect("smtp.gmail.com",userName,password);
            transport.sendMessage(msg, msg.getAllRecipients());
            transport.close();
            System.out.println("message sent successfully");
            
        } catch(MessagingException e)	{
            System.out.println("Exception caught\n"+e.getMessage());
        }
       
       
       
      // Actual logic goes here.
       
      PrintWriter out = response.getWriter();
      out.println("<h1>" + message + "</h1>");
   }

   public void destroy() {
      // do nothing.
   }
}

