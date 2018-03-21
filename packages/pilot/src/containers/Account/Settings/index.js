import React, { Component } from 'react'
import {
  Grid,
  Row,
  Col,
  Card,
  CardTitle,
  CardSection,
  CardContent,
} from 'former-kit'
import IconInfo from 'emblematic-icons/svg/Info32.svg'


class Settings extends Component {
  constructor (props) {
    super(props)
    this.state = {
      companyInfoSectionCollapsed: false,
      personalInfoSectionCollapsed: false,
      addressInfoSectionCollapsed: false,
    }
  }

  handleSectionTitleClick (cardSectionStateProp) {
    return () => {
      const currentCollapseState = this.state[cardSectionStateProp]

      this.setState({
        [cardSectionStateProp]: !currentCollapseState,
      })
    }
  }
  render () {
    return (
      <Grid>
        <Row>
          <Col
            palm={12}
            tablet={12}
            desk={12}
            tv={12}
          >
            <Card>
              <CardTitle
                title="Dados da Empresa"
              />

              <CardContent>
                <CardSection
                  collapsed={this.state.companySectionCollapsed}
                  title="Informacoes da empresa"
                  subtitle="Verifique ou edite informacoes de sua empresa"
                  onTitleClick={this.handleSectionTitleClick('companySectionCollapsed')}
                  icon={<IconInfo height={16} width={16} />}
                >
                  {'dasdadas'}
                </CardSection>

                <CardSection
                  collapsed={this.state.personalInfoSectionCollapsed}
                  title="Informacoes da empresa"
                  subtitle="Verifique ou edite informacoes de sua empresa"
                  onTitleClick={this.handleSectionTitleClick('personalInfoSectionCollapsed')}
                  icon={<IconInfo height={16} width={16} />}
                >
                  {'dasdadas'}
                </CardSection>


                <CardSection
                  collapsed={this.state.addressInfoSectionCollapsed}
                  title="Endereço Residencial"
                  subtitle="Verifique ou edite informacoes de sua empresa"
                  onTitleClick={this.handleSectionTitleClick('addressInfoSectionCollapsed')}
                  icon={<IconInfo height={16} width={16} />}
                >
                  {'dasdadas'}
                </CardSection>

              </CardContent>
            </Card>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default Settings
