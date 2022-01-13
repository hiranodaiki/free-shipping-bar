import { Layout, Card, TextContainer, Heading, Button } from "@shopify/polaris";

type MyLayoutAnnotatedSectionProps = {
  title: string;
  description: string;
  cards: {
    heading: string;
    content: string;
    buttonText?: string | undefined;
    buttonUrl?: string | undefined;
    buttonExternal?: boolean | undefined;
  }[];
};

const MyLayoutAnnotatedSection = ({
  title,
  description,
  cards,
}: MyLayoutAnnotatedSectionProps) => {
  return (
    <Layout.AnnotatedSection title={title} description={description}>
      {cards.map(
        (
          { heading, content, buttonText, buttonUrl, buttonExternal = true },
          index
        ) => (
          <Card key={index} sectioned>
            <TextContainer>
              <Heading element="h3">{heading}</Heading>
              <p>{content}</p>
              {buttonText && buttonUrl ? (
                <Button external={buttonExternal} url={buttonUrl}>
                  {buttonText}
                </Button>
              ) : null}
            </TextContainer>
          </Card>
        )
      )}
    </Layout.AnnotatedSection>
  );
};

export default MyLayoutAnnotatedSection;
