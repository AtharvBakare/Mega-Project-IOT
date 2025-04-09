 #define SENSOR_PIN 2   // IR sensor
#define RELAY_PIN 3    // Relay

void setup() {
  pinMode(SENSOR_PIN, INPUT);
  pinMode(RELAY_PIN, OUTPUT);

  // Turn off relay initially (LOW level triggered)
  digitalWrite(RELAY_PIN, HIGH);
}

void loop() {
  int objectDetected = digitalRead(SENSOR_PIN);

  if (objectDetected == LOW) {
    // Object present — turn ON relay (LOW level triggered)
    digitalWrite(RELAY_PIN, LOW);
  } else {
    // No object — turn OFF relay
    digitalWrite(RELAY_PIN, HIGH);
  }
}
