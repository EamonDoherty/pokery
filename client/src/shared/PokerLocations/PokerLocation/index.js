import React from 'react'
import styled from 'styled-components'
import Box from '../../Box'
import Align from '../../Align'
import Button from '../../Button'
import Input from '../../Input'
import FontAwesome from 'react-fontawesome'
import { NotificationManager } from 'react-notifications';



const Wrapper = styled.div`
  margin-top: 1em;
`

const Trash = ({ className, children }) => (
  <FontAwesome className={className} name="trash"/>
)

const Edit = ({ className, children }) => (
  <FontAwesome className={className} name="edit" />
)

const Close = ({ className, children }) => (
  <FontAwesome className={className} name="times" />
)

const DeleteButton = styled(Trash)`
  color: #e74c3c;
  color: white;
  vertical-align: top;
`
const EditButton = styled(Edit)`
  color: #3498db;
  color: white;
  vertical-align: top;
`

const CloseButton = styled(Close)`
  color: black;
  color: white;
  vertical-align: top;
`

class PokerLocation extends React.Component {
  constructor(props) {
    super(props)
    this.onInputChange = this.onInputChange.bind(this);
    this.onSaveEdit = this.onSaveEdit.bind(this);
    this.onDeleteLocation = this.onDeleteLocation.bind(this);

    this.state = {
      editMode: false,
      name: props.name,
      value: props.name,
      id: props.id
    }
  }

  onInputChange(event) {
    this.setState({value: event.target.value})
  }

  onSaveEdit() {
    var newName = this.state.value;
    var validationErrors = [];
    const maxChars = 100

    if (newName !== this.state.name) {

      if (newName.trim() === "") {
      }
      if (newName.trim().length >  maxChars) {
        validationErrors.push(`Poker Location must be less that ${maxChars} characters.`)
      }
      if (validationErrors.length > 0) {
        return validationErrors.forEach(error => NotificationManager.warning(error))
      }

      this.props.editLivePokerLocation(this.props.id, newName, (err, location) => {
        if (!err) {
          this.setState({editMode: false})
          NotificationManager.success('Poker Location Updated')
        } else {
          NotificationManager.error('The poker location could not be updated. Try again later.')          
          console.log(err);
        }
      });
    }

  }

  onDeleteLocation() {
    this.props.deleteLivePokerLocation(this.state.id, this.state.name, (err, successful) => {
      if (!err) {
        NotificationManager.success('Location deleted')        
      } else {
        NotificationManager.error('The poker location could not be deleted. Try again later.')
        console.log(err);
      }
    })
  }

  toggleEditMode() {
    this.setState(prevState => {
      prevState.editMode = !prevState.editMode
      return prevState
    })
  }

  render () {
    return (
      <Wrapper>
        <Box>
          <div className="container">
            <div className="grid">
              <div className="grid__col grid__col--9-of-12">
                {this.state.editMode ?
                  <Input
                    onChange={this.onInputChange}
                    autoFocus
                    value={this.state.value}/> :
                  this.props.name
                }


              </div>

              <div className="grid__col grid__col--3-of-12">
                {!this.state.editMode?

                  <Align to="right">
                    <Button bgColor="#e74c3c" onClick={this.onDeleteLocation}>
                      <DeleteButton />
                    </Button>
                    <Button bgColor="#3498db" onClick={this.toggleEditMode.bind(this)}>
                      <EditButton />
                    </Button>
                  </Align> :

                  <Align to="right">
                    <Button bgColor="black" onClick={this.toggleEditMode.bind(this)}>
                      <CloseButton />
                    </Button>
                  </Align>

                }

              </div>
            </div>
          </div>
          {this.state.editMode?
            <div>
              <Button onClick={this.onSaveEdit}>Save Edit</Button>
            </div>: null}

        </Box>
      </Wrapper>
    )
  }
}

export default PokerLocation
