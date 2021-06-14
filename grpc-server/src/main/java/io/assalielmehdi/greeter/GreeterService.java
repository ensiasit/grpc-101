package io.assalielmehdi.greeter;

import io.assalielmehdi.greeter.grpc.GreetRequest;
import io.assalielmehdi.greeter.grpc.GreetResponse;
import io.assalielmehdi.greeter.grpc.GreeterGrpc;
import io.grpc.stub.StreamObserver;

public class GreeterService extends GreeterGrpc.GreeterImplBase {

  @Override
  public void greet(GreetRequest request, StreamObserver<GreetResponse> responseObserver) {
    System.out.println("[gRPC Server] New greet request");

    final var response = GreetResponse
      .newBuilder()
      .setGreeting(String.format("Hello %s", request.getName()))
      .build();

    responseObserver.onNext(response);

    responseObserver.onCompleted();
  }

}
