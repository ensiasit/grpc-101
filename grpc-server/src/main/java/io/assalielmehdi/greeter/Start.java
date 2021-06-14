package io.assalielmehdi.greeter;

import java.io.IOException;

public class Start {

  public static void main(String[] args) throws IOException, InterruptedException {
    final var server = new Server();

    server.start();
  }

}
