package io.assalielmehdi.greeter;

import io.grpc.ServerBuilder;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

public class Server {

  private final io.grpc.Server grpcServer;

  private static final int PORT = Integer.parseInt(System.getenv().getOrDefault("PORT", "8081"));

  private static final int AWAIT_TERMINATION_SEC = 30;

  public Server() {
    grpcServer = ServerBuilder
      .forPort(PORT)
      .addService(new GreeterService())
      .build();
  }

  public void start() throws IOException, InterruptedException {
    grpcServer.start();
    System.out.printf("[gRPC Server] Server started on port %d%n", PORT);

    Runtime.getRuntime().addShutdownHook(new Thread() {

      @Override
      public void run() {
        System.out.println("[gRPC Server] Stopping server");

        try {
          grpcServer.shutdown().awaitTermination(AWAIT_TERMINATION_SEC, TimeUnit.SECONDS);
        } catch (InterruptedException e) {
          e.printStackTrace();
          this.interrupt();
        }
      }

    });

    grpcServer.awaitTermination();
  }

}
