import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Select, { components } from 'react-select';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import {
  getLanguages,
  addTalentLanguage,
  getPrevTLang
} from '../../actions/language';
import { getAccents, addTalentAccent, getPrevTAcc } from '../../actions/accent';
import { getTalent } from '../../actions';
import { addTalentBio } from '../../actions/talentBio';
import makeAnimated from 'react-select/animated';
import TalentProfileSample from './TalentProfileSample';
import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/talent-profile.css';
import goldMic from '../../images/Gold-Mic.png';
import silverMic from '../../images/Silver-Mic.png';
import bronzeMic from '../../images/Bronze-Mic.png';

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' }
];

const ageOptions = [
  { value: 'child', label: 'Child' },
  { value: 'teen', label: 'Teen' },
  { value: 'adult', label: 'Adult' },
  { value: 'senior', label: 'Senior' }
];

class TalentProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: jwt.decode(localStorage.getItem('token')).userId,
      talent: {},
      voiceGender: '',
      voiceAge: '',
      languageOptions: [],
      accentOptions: [],
      languages: [],
      accents: [],
      biography: ''
    };
  }

  //On Mount, lang/accents are pulled from back-end and added to store, then
  //modified to a format that the form fields can use and put into state
  componentDidMount() {
    this.props
      .getTalent(this.state.userId)
      .then(res => this.setState({ talent: this.props.talent[0] }));
    this.props.getLanguages().then(res => {
      const languageOptions = this.modLanguage(this.props.languageOptions);
      this.setState({ languageOptions: languageOptions });
    });
    this.props.getAccents().then(res => {
      const accentOptions = this.modAccents(this.props.accentOptions);
      this.setState({ accentOptions: accentOptions });
    });
    this.props.getPrevTLang(this.state.userId).then(res => {
      const prevLang = this.modLanguage(this.props.prevLanguages);
      this.setState({ languages: prevLang });
    });
    this.props.getPrevTAcc(this.state.userId).then(res => {
      const prevAcc = this.modAccents(this.props.prevAccents);
      this.setState({ accents: prevAcc });
    });
  }

  modLanguage = origArray => {
    const newArray = origArray.map(item => ({
      value: item.language,
      label: item.language,
      languageId: item.languageId
    }));

    return newArray;
  };

  modAccents = origArray => {
    const newArray = origArray.map(item => ({
      value: item.accent,
      label: item.accent,
      accentId: item.accentId
    }));
    return newArray;
  };

  submitTalentLanguages = talentLangArray => {
    talentLangArray.forEach(newLang => {
      const langSubmit = {
        userId: this.state.userId,
        languageId: newLang.languageId
      };
      this.props.addTalentLanguage(langSubmit);
    });
  };

  submitTalentAccents = talentAccentArray => {
    talentAccentArray.forEach(newAccent => {
      const accentSubmit = {
        userId: this.state.userId,
        accentId: newAccent.accentId
      };
      this.props.addTalentAccent(accentSubmit);
    });
  };

  submitChanges = (voiceGender, voiceAge, biography) => {
    let talent = this.props.talent[0];
    const bioSubmit = {
      talentId: talent.talentId,
      voiceGender: voiceGender.length > 0 ? voiceGender : talent.voiceGender,
      voiceAge: voiceAge.length > 0 ? voiceAge : talent.voiceAge,
      biography: biography.length > 0 ? biography : talent.biography
    };
    this.props.addTalentBio(bioSubmit);
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleAgeChange = voiceAge => {
    this.setState({ voiceAge: voiceAge.value });
  };

  handleGenderChange = voiceGender => {
    this.setState({ voiceGender: voiceGender.value });
  };

  handleLanguageChange = languages => {
    this.setState({ languages });
  };

  handleAccentChange = accents => {
    this.setState({ accents });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.submitTalentLanguages(this.state.languages);
    this.submitTalentAccents(this.state.accents);
    this.submitChanges(
      this.state.voiceGender,
      this.state.voiceAge,
      this.state.biography
    );
  };

  loyaltyLevel = level => {
    if (level === 1) {
      return <img className="loyaltyBadge" src={bronzeMic} alt="bronze-mic" />;
    } else if (level === 2) {
      return <img className="loyaltyBadge" src={silverMic} alt="silver-mic" />;
    } else if (level === 3) {
      return <img className="loyaltyBadge" src={goldMic} alt="gold-mic" />;
    }
  };

  render() {
    return (
      <div style={{ marginTop: '21vh' }} className="TalentProfile">
        <h1 className="title">TALENT PROFILE</h1>
        {this.loyaltyLevel(this.state.talent.loyaltyLevel)}
        <Form className="ProfileForm">
          <FormGroup tag="fieldset">
            <Label for="genderSelect">Select Voice Gender</Label>
            <Select
              className="mt-0 mb-3 col-md-11 col-offset-4"
              onChange={this.handleGenderChange}
              components={makeAnimated()}
              options={genderOptions}
            />
          </FormGroup>
          <FormGroup>
            <Label for="voiceAgeSelect">Select Voice Age</Label>
            <Select
              className="mt-0 mb-3 col-md-11 col-offset-4"
              onChange={this.handleAgeChange}
              components={makeAnimated()}
              options={ageOptions}
            />
          </FormGroup>
          <FormGroup>
            <Label for="languageSelect">Select Languages</Label>
            <Select
              className="mt-0 mb-3 col-md-11 col-offset-4"
              onChange={this.handleLanguageChange}
              components={makeAnimated()}
              isMulti
              options={this.state.languageOptions}
              value={this.state.languages}
            />
          </FormGroup>
          <FormGroup>
            <Label for="accentSelect">Select Accents</Label>
            <Select
              className="mt-0 mb-3 col-md-11 col-offset-4"
              onChange={this.handleAccentChange}
              components={makeAnimated()}
              isMulti
              options={this.state.accentOptions}
              value={this.state.accents}
            />
          </FormGroup>
          <FormGroup className="bioForm">
            <Label for="bioText">Bio (Tell us a bit about yourself)</Label>
            <Input
              className="mt-0 mb-3 ml-3 col-md-11 col-offset-4"
              type="textarea"
              name="biography"
              id="bioText"
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button
            onClick={this.handleSubmit}
            outline
            size="lg"
            className="saveButton"
          >
            Save Profile
          </Button>
          <TalentProfileSample userId={this.state.userId} />
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  prevLanguages: state.languageReducer.prevLanguages,
  prevAccents: state.accentReducer.prevAccents,
  languageOptions: state.languageReducer.languages,
  accentOptions: state.accentReducer.accents,
  talent: state.getTalentReducer.talent
});

export default connect(mapStateToProps, {
  getAccents,
  getLanguages,
  getTalent,
  addTalentAccent,
  addTalentLanguage,
  addTalentBio,
  getPrevTLang,
  getPrevTAcc
})(TalentProfile);
