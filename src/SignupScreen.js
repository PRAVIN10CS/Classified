import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  Dimensions,
  SafeAreaView,
  ImageBackground,
} from 'react-native';

import EmailTextField from '../component/EmailTextField';
import PasswordTextField from '../component/PasswordTextField';
import RoundedTextField from '../component/RoundedTextField';
import RoundedButton from '../component/RoundedButton';
import {ScrollView} from 'react-native-gesture-handler';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';

const {widht, height} = Dimensions.get('window');
import backgrobd from '../image/bg.jpg';
import service from '../service';

class SignupScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      isValid: true,
      errors: false,
      Fullname: '',
      PhoneNumber: '',
      Designation: '',
      BussinessEmail: '',
      selectedValue: '',
      selectedCountry: '',
      selectedArea: '',
      selectedParticipant: '',
      selectedPlanType: '',

      userValues: [],
      countryList: [],
      areaOfInterest: [],
      listOfParticipants: [],
      PlanType: [],
      ParticipateIn: [
        '--Select Particition--',
        'ICW 2020',
        'NDIS 2020',
        'ILCE Workshop',
      ],
      KnowingTypeList: [
        '--How did you know --',
        'Facebook',
        'Twitter',
        'Linkedin',
        'Google',
        'Website',
        'Newspaper',
        'Friends',
        'NewsLetter',
        'Other',
      ],
    };
  }

  componentDidMount() {
    this.getCountryList();
    this.AreaofInterest();
    this.ListofParticants();
  }

  PlanTypeMethod = (value) => {
    var params = new URLSearchParams();
    params.append('method', 'setRegistrationFormApi');
    params.append('form_key', 'PLAN');
    params.append('par', value);
    service.get('/index.php', params).then(async ({data}) => {
      console.log(data[0].status);
      try {
        if (data[0].status == 1) {
          this.setState({PlanType: data[0].plan_data});
        } else {
          this.setState({PlanType: []});
        }
      } catch (Error) {
        console.log(Error);
      }
    });
  };
  ListofParticants = () => {
    var params = new URLSearchParams();
    params.append('method', 'setRegistrationFormApi');
    params.append('form_key', 'PA');
    service.get('/index.php', params).then(async ({data}) => {
      this.setState({listOfParticipants: data});
    });
  };
  AreaofInterest = () => {
    var params = new URLSearchParams();
    params.append('method', 'setRegistrationFormApi');
    params.append('form_key', 'AOI');
    service.get('/index.php', params).then(async ({data}) => {
      this.setState({areaOfInterest: data});
    });
  };
  getCountryList = () => {
    var params = new URLSearchParams();
    params.append('method', 'setRegistrationFormApi');
    params.append('form_key', 'C');
    service.get('/index.php', params).then(async ({data}) => {
      this.setState({
        countryList: data.country_data,
      });
    });
  };

  static navigationOptions = {
    header: null,
  };

  defaultScrollViewProps = {
    keyboardShouldPersistTaps: 'handled',
    contentContainerStyle: {
      flex: 1,
      justifyContent: 'center',
    },
  };

  onNextStep = () => {};
  changeValue = (e) => {};

  firstStep = () => {
    if (!Fullname && !PhoneNumber && !BussinessEmail && !Designation) {
      console.log(
        Fullname + '' + PhoneNumber + '' + BussinessEmail + '' + Designation,
      );
      alert('Field can not be blank');
    } else {
      console.log(
        Fullname + '' + PhoneNumber + '' + BussinessEmail + '' + Designation,
      );
      this.setState({isValid: true});
    }

    if (!this.state.isValid) {
      this.setState({errors: true});
    } else {
      this.setState({errors: false});
    }
  };

  onPrevStep = () => {};

  onSubmitSteps = () => {};

  render() {
    let myUsers = this.state.ParticipateIn.map((myValue, myIndex) => {
      return <Picker.Item label={myValue} value={myValue} key={myIndex} />;
    });
    let myKnowType = this.state.KnowingTypeList.map((myValue, myIndex) => {
      return <Picker.Item label={myValue} value={myValue} key={myIndex} />;
    });
    let country = this.state.countryList.map((myValue, myIndex) => {
      return (
        <Picker.Item
          label={myValue.country_name}
          value={myIndex}
          key={myIndex}
        />
      );
    });
    let ListOfArea = this.state.areaOfInterest.map((myValue, myIndex) => {
      return (
        <Picker.Item label={myValue.title} value={myIndex} key={myIndex} />
      );
    });
    let ListOfParticipant = this.state.listOfParticipants.map(
      (myValue, myIndex) => {
        return (
          <Picker.Item
            label={myValue.name}
            value={myValue.value}
            key={myIndex}
          />
        );
      },
    );
    let ListPlantyle = this.state.PlanType.map((myValue, myIndex) => {
      return (
        <Picker.Item
          label={myValue.plan_name}
          value={myValue.plan_id}
          key={myIndex}
        />
      );
    });
    return (
      <ImageBackground style={{flex: 1}} source={backgrobd}>
        <ProgressSteps>
          <ProgressStep
            label="User Profile"
            onNext={this.firstStep}
            errors={this.state.errors}
            onPrevious={this.onPrevStep}
            scrollViewProps={this.defaultScrollViewProps}>
            <SafeAreaView>
              <ScrollView
                contentContainerStyle={{flexGrow: 1}}
                keyboardShouldPersistTaps="handled">
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <RoundedTextField
                    placeHolder="Full Name"
                    onTermChange={this.changeValue}
                  />

                  <RoundedTextField placeHolder="Phone Number" />
                  <RoundedTextField placeHolder="Designation" />
                  <EmailTextField placeholder="Business Email" />
                </View>
              </ScrollView>
            </SafeAreaView>
          </ProgressStep>
          <ProgressStep
            label="Company Profile"
            onNext={this.onNextStep}
            onPrevious={this.onPrevStep}
            scrollViewProps={this.defaultScrollViewProps}>
            <SafeAreaView>
              <ScrollView
                contentContainerStyle={{flexGrow: 1}}
                keyboardShouldPersistTaps="handled">
                <View>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <RoundedTextField placeHolder="Company Name" />
                    <RoundedTextField placeHolder="Company Address" />
                    <RoundedTextField placeHolder="Company Telephone" />
                    <RoundedTextField placeHolder="Nature of Business / Company Profile" />
                  </View>
                </View>
              </ScrollView>
            </SafeAreaView>
          </ProgressStep>
          <ProgressStep
            label="Additional Information"
            onSubmit={this.onSubmitSteps}
            onPrevious={this.onPrevStep}
            scrollViewProps={this.defaultScrollViewProps}>
            <SafeAreaView>
              <ScrollView>
                <View>
                  <View style={{alignItems: 'center'}}>
                    <View style={styles.spinnerView}>
                      <Picker
                        placeholder="Select Country"
                        selectedValue={this.state.selectedCountry}
                        itemStyle={{
                          backgroundColor: 'grey',
                          color: 'blue',
                          fontFamily: 'Ebrima',
                          fontSize: 17,
                        }}
                        onValueChange={(itemValue, itemIndex) =>
                          this.setState({selectedCountry: itemValue})
                        }>
                        <Picker.Item
                          label={'Select Country'}
                          value={'Select Country'}
                        />
                        {country}
                      </Picker>
                    </View>
                    <View style={styles.spinnerView}>
                      <Picker
                        selectedValue={this.state.selectedArea}
                        onValueChange={(value) =>
                          this.setState({selectedArea: value})
                        }>
                        <Picker.Item
                          label={'Select Area of Interest'}
                          value={'Select Area of Interest'}
                        />
                        {ListOfArea}
                      </Picker>
                    </View>
                    <View style={styles.spinnerView}>
                      <Picker
                        selectedValue={this.state.selectedParticipant}
                        onValueChange={(value) =>
                          this.setState({selectedParticipant: value}, () => {
                            this.PlanTypeMethod(value);
                          })
                        }>
                        <Picker.Item
                          label={'Select Participant Label'}
                          name={'Select Participant Label'}
                        />
                        {ListOfParticipant}
                      </Picker>
                    </View>
                    <View style={styles.spinnerView}>
                      <Picker
                        selectedValue={this.state.selectedPlanType}
                        onValueChange={(value) =>
                          this.setState({selectedPlanType: value})
                        }>
                        <Picker.Item
                          label={'Select Plan type'}
                          value={'Select Plan type'}
                        />
                        {ListPlantyle}
                      </Picker>
                    </View>

                    <View style={styles.spinnerView}>
                      <Picker
                        selectedValue={this.state.selectedValue}
                        onValueChange={(value) =>
                          this.setState({selectedValue: value})
                        }>
                        {myUsers}
                      </Picker>
                    </View>
                    <View style={styles.spinnerView}>
                      <Picker
                        selectedValue={this.state.selectedValue}
                        onValueChange={(value) =>
                          this.setState({selectedValue: value})
                        }>
                        {myKnowType}
                      </Picker>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </SafeAreaView>
          </ProgressStep>
        </ProgressSteps>
      </ImageBackground>
    );
  }
}
export default SignupScreen;
const styles = StyleSheet.create({
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginHorizontal: 30,
    marginBottom: 30,
    marginTop: 20,
    textAlign: 'center',
  },
  inputView: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  spinnerView: {
    width: '80%',
    backgroundColor: '#fff',
    height: 50,
    marginBottom: 20,
  },

  loginButtonStyle: {
    backgroundColor: 'black',
  },
  signInTextColorStyle: {
    color: 'white',
  },
  spinnerss: {
    width: '80%',
    height: height * 0.07,
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 10,
    justifyContent: 'center',
    padding: 5,
    borderColor: 'black',
    borderRadius: (height * 0.075) / 2,
  },
});
