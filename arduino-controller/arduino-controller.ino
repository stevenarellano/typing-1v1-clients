// Prepared by Prof. Ken Nakagaki for Class "Actuated User Interfaces and Technology"
// (With help of Anup[TA] and Chat-GPT[AI])
// Feb 15 2023

const int potPin = A0;    // analog input for reading the potentiometer value
const int enablePin = 3;  // PWM output for controlling motor speed
const int in1Pin = 5;     // control input 1 for motor driver
const int in2Pin = 6;     // control input 2 for motor driver
const int vibrationPin = 7;


void setup() {
  pinMode(enablePin, OUTPUT);
  pinMode(in1Pin, OUTPUT);
  pinMode(in2Pin, OUTPUT);
  pinMode(potPin, INPUT);
  pinMode(vibrationPin, OUTPUT);
  // Set the initial motor speed to zero
  analogWrite(enablePin, 0);

  Serial.begin(115200);
}

int SLIDER_WIDTH = 512;
int finished = -1;

void slideToP1() {
  digitalWrite(5, HIGH);
  digitalWrite(6, LOW);
  analogWrite(3, 255);  //define Speed
  delay(1000);          //wait for 1000ms
  digitalWrite(5, LOW);
  digitalWrite(6, LOW);
}
void slideToP2() {
  digitalWrite(5, LOW);
  digitalWrite(6, HIGH);
  analogWrite(3, 255);  //define Speed
  delay(1000);          //wait for 1000ms
  digitalWrite(5, LOW);
  digitalWrite(6, LOW);
}

void loop() {
  if (finished == 1) {
    slider_vibrate();
  }
  SerialEvent();
  digitalWrite(vibrationPin, LOW);
}

int milestone0 = -1;
int milestone1 = -1;
int milestone2 = -1;

void SerialEvent() {
  if (Serial.available()) {
    String message = Serial.readStringUntil('\n');
    Serial.println(message);
    if (message.startsWith("finished")) {

      int colon_index_1 = message.indexOf(":");  // find index of first colon

      String player_id_str = message.substring(colon_index_1 + 1);  // extract player id string

      int player_id = player_id_str.toInt();  // convert player id string to integer

      if (player_id == 0) {
        slideToP1();
      } else {
        slideToP2();
      }
      finished = 1;
    }
    if (message.startsWith("milestone")) {
      int milestones[] = { milestone0, milestone1, milestone2 };

      int colon_index_1 = message.indexOf(":");                     // find index of first colon
      int colon_index_2 = message.indexOf(":", colon_index_1 + 1);  // find index of second colon

      // Serial.print("payload, colon_index_1, colon_index_2: ");
      // Serial.println(message);
      // Serial.println(colon_index_1);
      // Serial.println(colon_index_2);

      String player_id_str = message.substring(colon_index_1 + 1, colon_index_2);  // extract player id string
      String milestone_str = message.substring(colon_index_2 + 1);                 // extract milestone string

      int player_id = player_id_str.toInt();      // convert player id string to integer
      int milestone_num = milestone_str.toInt();  // convert milestone st

      Serial.print("player_id: ");
      Serial.println(player_id);

      Serial.print("milestone_num: ");
      Serial.println(milestone_num);

      Serial.print("milestones[milestone_num]: ");
      Serial.println(milestones[milestone_num]);

      if (milestones[milestone_num] == -1) {
        if (milestone_num == 0) {
          milestone0 = player_id;
        } else if (milestone_num == 1) {
          milestone1 = player_id;
        } else {
          milestone2 = player_id;
        }
        if (player_id == 0) {
          slideToP1();
        } else {
          slideToP2();
        }
      }
    }
    if (message.startsWith("miss")) {
      vibrate();
    }
    if (message.startsWith("reset")) {
      reset();
    }
  }
}

void sliderInactive() {
  digitalWrite(5, LOW);
  digitalWrite(6, LOW);
  analogWrite(3, 0);  //define Speed
  delay(1000);        //wait for 1000ms
}

void slider_vibrate() {
  digitalWrite(5, LOW);
  digitalWrite(6, HIGH);
  analogWrite(3, 255);  //define Speed
  delay(10);            //wait for 1000ms
  digitalWrite(5, HIGH);
  digitalWrite(6, LOW);
  delay(10);
}

void reset() {
  finished = -1;
  milestone0 = -1;
  milestone1 = -1;
  milestone2 = -1;

  slideToP1();
  slideToP2();
  slideToP1();
  slideToP2();
}

void vibrate() {
  digitalWrite(vibrationPin, HIGH);
  delay(200);
  digitalWrite(vibrationPin, LOW);
}