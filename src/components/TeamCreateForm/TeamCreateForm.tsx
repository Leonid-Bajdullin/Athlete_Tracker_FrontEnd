import React, { Component } from 'react';
import { Button, Modal, Form, Col, Image } from 'react-bootstrap';
import { Formik } from 'formik';
import { inject, observer } from 'mobx-react';
import Container from 'typedi';

import { teamCreateSchema } from '../../validation/validationSchemaYup';
import './TeamCreateForm.css';
import { TeamService } from '../../services/TeamService';

const initialValues = {
  name: 'SuperTeam',
  description: "Team's description here",
  photoUrl:
    'https://www.eigenland.de/sites/default/files/2019-02/Eigenland_Team_Rakete.jpg'
};

@inject('store')
@observer
export class TeamCreateForm extends Component<
  { store?: any; onItemChange: any },
  { show: boolean }
> {
  teamService: TeamService;
  constructor(props: any) {
    super(props);

    this.state = {
      show: false
    };

    this.teamService = Container.get(TeamService);
  }

  handleClose = () => {
    this.setState({
      show: false
    });
  };

  handleShow = () => {
    this.setState({
      show: true
    });
  };

  submitCreate = (values: any) => {
    const { name, description, photoUrl } = values;
    const data = {
      name: name,
      description: description,
      photoUrl: photoUrl,
      userId: this.props.store.currentUser.id
    };
    this.teamService
      .submitTeamCreate(data)
      .then(() => {
        alert('Team successfully created');
        this.handleClose();
        this.props.store.getUserTeams();
        this.props.onItemChange();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  render() {
    return (
      <div>
        <section className="team-card">
          <div className="button-container">
            <div className="button-text">Create your team</div>
            <div id="plus" onClick={this.handleShow}>
              +
            </div>
          </div>
        </section>

        <Modal size="lg" show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create team</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={initialValues}
              onSubmit={this.submitCreate}
              validationSchema={teamCreateSchema}
            >
              {({
                handleChange,
                handleSubmit,
                errors,
                touched,
                values: teamInputs
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Row>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          name="name"
                          type="text"
                          placeholder="Enter your team's name"
                          value={teamInputs.name}
                          onChange={handleChange}
                          isValid={touched.name && !errors.name}
                          isInvalid={!!errors.name}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows="10"
                          name="description"
                          value={teamInputs.description}
                          onChange={handleChange}
                          isValid={touched.description && !errors.description}
                          isInvalid={!!errors.description}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Control.Feedback type="invalid">
                        {errors.description}
                      </Form.Control.Feedback>
                    </Col>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Photo URL</Form.Label>
                        <Form.Control
                          name="photoUrl"
                          type="text"
                          placeholder="Enter photo URL"
                          value={teamInputs.photoUrl}
                          onChange={handleChange}
                          isValid={touched.photoUrl && !errors.photoUrl}
                          isInvalid={!!errors.photoUrl}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {errors.photoUrl}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Photo preview</Form.Label>
                        <div className="form-img-container">
                          <Image
                            className="form-img"
                            src={teamInputs.photoUrl}
                            alt="Team Photo"
                          ></Image>
                        </div>
                      </Form.Group>
                    </Col>
                  </Form.Row>
                  <Button variant="success" type="submit">
                    Create team
                  </Button>
                </Form>
              )}
            </Formik>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
