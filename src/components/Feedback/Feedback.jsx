import { Wrapper } from './Feedback.styled';
import { FeedbackOptions } from '../FeedbackOptions';
import { Statistics } from "components/Statistics";
import { Section } from '../Section';
import { Notification } from '../Notification';
import { useState } from "react";

export function Feedback() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onButtonHandle = event => {
    switch (event.currentTarget.name) {
      case 'good':
        setGood(s => s + 1);
        break;
      
        case 'neutral':
          setNeutral(s => s + 1);
        break;
      
        case 'bad':
          setBad(s => s + 1);
        break;
      
      default:
        return;
    }
  }
    
   const countTotalFeedback = () => {
        return good + neutral + bad
    }

   const countPositiveFeedbackPercentage = () => {
      if (good === 0) {
        return 0
      }
        return Math.round(100 * good/countTotalFeedback());
    }

    return (
        <Wrapper>
        <Section title="Please leave feedback">
          <FeedbackOptions onButtonHandle={onButtonHandle} options={Object.keys({ good, neutral, bad })}></FeedbackOptions>
        </Section>

        {countTotalFeedback() === 0 ? (<Notification message="There is no feedback"></Notification>) :
        (<Section title="Statistics">
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={countTotalFeedback()}
          positivpercentage={countPositiveFeedbackPercentage()}>
        </Statistics>
      </Section>)}
      </Wrapper>
    )
  }