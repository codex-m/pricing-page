import React, {Component, Fragment} from 'react';
import FSPricingContext from "../FSPricingContext";
import {RefundPolicyType} from "../entities/Plugin";
import {Helper} from "../Helper";
import guaranteeStamp from "../assets/img/guarantee-stamp.svg";
import Icon from "./Icon";

class RefundPolicy extends Component {
    static contextType = FSPricingContext;

    constructor (props) {
        super(props);
    }

    render() {
        let context = this.context;

        if ( ! context || ! context.plugin || ! Helper.isNumeric(context.plugin.id)) {
            return null;
        }

        let plugin       = context.plugin,
            refundType   = '',
            refundPolicy = '';

        switch (plugin.refund_policy) {
            case RefundPolicyType.FLEXIBLE:
                refundType   = 'Double Guarantee';
                refundPolicy = <Fragment>You are fully protected by our 100% No-Risk Double Guarantee. If you don't like our {plugin.moduleLabel()} over the next {plugin.moneyback_period} days, we'll happily refund 100% of your money. <b>No questions asked.</b></Fragment>;
                break;
            case RefundPolicyType.MODERATE:
                refundType   = 'Satisfaction Guarantee';
                refundPolicy = `You are fully protected by our 100% Satisfaction Guarantee. If over the next ${plugin.moneyback_period} days you are unhappy with our ${plugin.moduleLabel()} or have an issue that we are unable to resolve, we'll happily consider offering a 100% refund of your money.`;
                break;
            case RefundPolicyType.STRICT:
            default:
                refundType   = 'Money Back Guarantee';
                refundPolicy = `You are fully protected by our 100% Money Back Guarantee. If during the next ${plugin.moneyback_period} days you experience an issue that makes the ${plugin.moduleLabel()} unusable and we are unable to resolve it, we'll happily consider offering a full refund of your money.`;
                break;
        }

        return (
            <Fragment>
                <h2 className="fs-money-back-guarantee-title">{plugin.moneyback_period}-day {refundType}</h2>
                <p className="fs-money-back-guarantee-message">{refundPolicy}</p>
                <button className="fs-button fs-button--size-small" onClick={this.props.toggleRefundPolicyModal}>Learn More</button>
                <img src={guaranteeStamp}/>
                {this.context.showRefundPolicyModal &&
                    <div className="fs-modal fs-modal--refund-policy">
                        <section className="fs-content-container">
                            <header className="fs-header fs-dark">
                                <h3>Refund Policy</h3>
                                <i className="fs-close"><Icon icon={['fas', 'times-circle']} onClick={this.props.toggleRefundPolicyModal}/></i>
                            </header>
                            <div className="fs-content">
                                <p>{refundPolicy}</p>
                                <p>Just start a refund ticket through the "Contact Us" in the plugin's admin settings and we'll process a refund.</p>
                                <p>To submit a refund request, please open a <a className="fs-contact-link" href="#" data-topic="fs-refund">refund support ticket</a>.</p>
                            </div>
                        </section>
                    </div>
                }
            </Fragment>
        );
    }
}

export default RefundPolicy;