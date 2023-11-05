import { AccordionList, Accordion, AccordionHeader, AccordionBody } from "@tremor/react";

const CoolAccordion = (props) => {
    const { title, content } = props
    return (
        <div>
            <Accordion>
                <AccordionHeader>{title}</AccordionHeader>
                <AccordionBody>
                    {content}
                </AccordionBody>
            </Accordion>
        </div>
    )
}

export default CoolAccordion