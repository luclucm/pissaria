
import java.io.*;
import java.net.InetSocketAddress;
import com.sun.net.httpserver.*;

public class Server {
    public static void main(String[] args) throws IOException {
        
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);

        server.createContext("/salva", exchange -> {
            if ("POST".equals(exchange.getRequestMethod())) {
                
                InputStream is = exchange.getRequestBody();
                String body = new String(is.readAllBytes());

                try (FileWriter fw = new FileWriter("ordini.txt", true)) {
                    fw.write(body + "\n");
                }

                String resp = "OK";
                exchange.sendResponseHeaders(200, resp.length());
                OutputStream os = exchange.getResponseBody();
                os.write(resp.getBytes());
                os.close();
            }
        });

        server.start();
        System.out.println("Server attivo su http://localhost:8080");
    }
}
