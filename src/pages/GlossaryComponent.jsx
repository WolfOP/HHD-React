import React from "react";

// Comprehensive glossary for VCE HHD Unit 3, based on the source report
const glossaryTerms = [
  { term: "Access (to healthcare)", definition: "The ability of people to obtain healthcare at the right place and right time, irrespective of income, cultural background or physical location." },
  { term: "Australian Dietary Guidelines (ADGs)", definition: "Provide evidence-based advice on the types and amounts of foods that Australians should eat for health and wellbeing." },
  { term: "Australian Guide to Healthy Eating (AGHE)", definition: "A visual food selection guide reflecting the ADGs, showing proportions of the five food groups for daily consumption." },
  { term: "Behavioural Factors", definition: "Actions or patterns of living of an individual or group that impact on health, such as smoking, alcohol use, physical activity, and dietary choices." },
  { term: "Biomedical approach to health", definition: "This approach focuses on the scientific and medical tools needed to diagnose, treat, and prevent severe disease." },
  { term: "Biological factors", definition: "Factors relating to the body that impact on health and wellbeing, such as genetics, body weight, blood pressure, blood cholesterol, glucose regulation, and birth weight." },
  { term: "Burden of disease (BOD)", definition: "A measure of the impact of diseases and injuries, looking at the gap between current health status and an ideal situation where everyone lives to an old age free of disease and disability. It is typically in relation to a particular condition." },
  { term: "Case study analysis", definition: "A suitable task for assessment in Unit 3, and a skill developed throughout Units 3 and 4." },
  { term: "Commercial factors", definition: "These are challenges in bringing about nutritional change and can influence the use of various products such as tobacco, e-cigarettes, alcohol, food, cars, medicine, and online platforms." },
  { term: "Concepts of health and wellbeing", definition: "Includes the physical, social, emotional, mental and spiritual dimensions, and their dynamic and subjective nature." },
  { term: "Critical inquiry", definition: "Engaging in processes that develop the ability to research, analyse, apply and appraise knowledge. This approach enables critical evaluation of factors influencing health and wellbeing and explores how social justice can improve health and wellbeing and health status." },
  { term: "DALY (Disability-Adjusted Life Year)", definition: "A measure of burden of disease. It is equal to one year of healthy life lost due to premature death and time lived with illness, disease, and injury. The formula is DALY = YLL + YLD." },
  { term: "Data analysis", definition: "A tool embedded within all units to develop health literacy and inform critical inquiry. It involves interpreting and analysing various data types (tables, graphs, infographics, quotations, case studies) and measures (percentages, ratios). It is a suitable assessment task in Unit 3." },
  { term: "Disease", definition: "Refers to a particular unhealthy condition or illness. Burden of disease measures the impact of diseases." },
  { term: "Dynamic", definition: "Refers to health and wellbeing and illness constantly undergoing change, which can also happen quickly. It is a key nature of health and wellbeing and illness." },
  { term: "Education", definition: "A prerequisite for health as determined by the WHO. It can promote health outcomes." },
  { term: "Emotional health and wellbeing", definition: "Relates to the ability to express feelings in a positive way, about managing and expressing emotional actions and reactions, and displaying resilience. It is one of the five dimensions of health and wellbeing." },
  { term: "Environmental factors", definition: "These are factors that contribute to variations in health status between population groups. Examples include poor quality housing leading to exposed timber and wiring, potentially contributing to injuries." },
  { term: "Equity", definition: "A concept related to fairness and social justice, focusing on disadvantaged groups having access to the resources needed for a decent standard of living. It is a prerequisite for health as determined by the WHO. Australia's health system has a role in promoting health in terms of equity." },
  { term: "External assessment (End-of-year examination)", definition: "Assesses the level of achievement for Units 3 and 4, contributing 50 per cent to the study score. All key knowledge and key skills from Units 3 and 4 are examinable." },
  { term: "Food", definition: "A prerequisite for health as determined by the WHO. Access to food promotes health outcomes." },
  { term: "Functional dimension", definition: "Refers to the basic skills to research and apply health information, acquire knowledge, and utilise health services to respond to a health-related question. This is a dimension of individual health literacy." },
  { term: "Funding", definition: "Refers to how Australia's health system (Medicare, private health insurance, PBS, NDIS) is financed. It is a key aspect of the health system's role in promoting health." },
  { term: "Health", definition: "A broad, overarching term that includes the concepts of health and wellbeing, health status, and associated health outcomes. It is considered a global concept in Unit 3." },
  { term: "Health and wellbeing", definition: "Relates to a person’s physical, social, emotional, mental, and spiritual existence, characterised by an equilibrium in which the individual feels happy, healthy, capable, and engaged. It is multidimensional, dynamic, and subjective. Wellbeing is considered an implicit element of health." },
  { term: "Health-adjusted life expectancy (HALE)", definition: "An indicator used to measure health status." },
  { term: "Health literacy", definition: "The extent to which people can access, critique, understand, and use health information and services to promote and maintain health and wellbeing. It involves individual health literacy (functional, interactive, critical dimensions) and the health literacy environment. Students develop health literacy in this study." },
  { term: "Health outcomes", definition: "Refers to the results of factors influencing health. When discussing health outcomes, one can refer to health and wellbeing dimensions and/or health status indicators." },
  { term: "Health promotion", definition: "A focus of Unit 3, Area of Study 2. Its role in improving population health is key knowledge. It is the process of enabling people to increase control over, and improve, their health. Strategies and initiatives are evaluated in Unit 3." },
  { term: "Health status", definition: "Refers to indicators used to measure the health of a population. Key skills involve interpreting and applying this data and evaluating the health status of Australians using data. Variations in health status between population groups are analysed." },
  { term: "Illness", definition: "Refers to a person's experience of disease or unhealthy condition. It is dynamic and subjective." },
  { term: "Importance of health and wellbeing as a resource", definition: "Optimal health and wellbeing is important as a resource individually, nationally, and globally." },
  { term: "Incidence", definition: "An indicator used to measure health status, referring to the number or rate of new cases of a particular condition during a specific period of time." },
  { term: "Income", definition: "A prerequisite for health as determined by the WHO. Earning an income enables purchasing resources and contributes to government revenue." },
  { term: "Indicators used to measure health status", definition: "Measures used to understand health status, including incidence, prevalence, morbidity, burden of disease (DALY, YLL, YLD), life expectancy, health-adjusted life expectancy (HALE), mortality (maternal, infant, and under five), and self-assessed health status." },
  { term: "Individual health literacy", definition: "Refers to the skills, knowledge, motivation, and capacity of a person to access, understand, appraise, and apply information to make effective decisions about health and health care, and take appropriate action. It has functional, interactive, and critical dimensions." },
  { term: "Interactive dimension", definition: "Includes more advanced knowledge, understanding, and skills to engage with a health issue actively and independently, and to apply new health information. This is a dimension of individual health literacy." },
  { term: "Interrelationships between dimensions of health and wellbeing", definition: "The five dimensions of health and wellbeing are interrelated and influence one another. Changes in one dimension usually affect others." },
  { term: "Life expectancy", definition: "An indicator used to measure health status, indicating how long an individual is expected to live based on current death rates." },
  { term: "Medicare", definition: "Part of Australia's health system. Its role in promoting health is analysed in terms of funding, sustainability, access, and equity. It covers out-of-hospital and in-hospital expenses in public hospitals. Funded through the Medicare levy, Medicare levy surcharge, and general taxation." },
  { term: "Mental health and wellbeing", definition: "Relates to the state of a person’s mind or brain, and the ability to think and process information. It is about maintaining positive thought patterns, for example, and also includes the ability to use the brain to learn, make decisions, and solve problems. It is one of the five dimensions of health and wellbeing." },
  { term: "Morbidity", definition: "An indicator used to measure health status, referring to illness or disease." },
  { term: "Mortality", definition: "Refers to death, particularly at a population level. Indicators include maternal, infant, and under five mortality." },
  { term: "NDIS (National Disability Insurance Scheme)", definition: "Part of Australia's health system. Its role in promoting health is analysed in terms of funding, sustainability, access, and equity. It provides services and support for people with a permanent or significant disability." },
  { term: "Nutritional imbalance", definition: "Includes under-consumption of fruit and vegetables, and dairy foods, and high intake of fat, salt, and sugar, and low intake of fibre. These contribute to Australia's health status. Challenges in bringing about nutritional change are analysed." },
  { term: "‘Old’ public health", definition: "Refers to reasons for improvements in Australia’s health status since 1900." },
  { term: "Ottawa Charter for Health Promotion", definition: "A concept related to the social model of health, explaining how initiatives lead to improved health outcomes. Its action areas are applied." },
  { term: "Peace", definition: "A prerequisite for health as determined by the WHO. It promotes health outcomes. Infrastructure is less likely to be destroyed during times of peace." },
  { term: "PBS (Pharmaceutical Benefits Scheme)", definition: "Part of Australia's health system. Its role in promoting health is analysed in terms of funding, sustainability, access, and equity. It subsidises essential medicines." },
  { term: "Physical health and wellbeing", definition: "Relates to the functioning of the body and its systems, including the physical capacity to perform daily activities or tasks. It is supported by factors like physical activity, diet, rest, body weight, and absence of illness/disease/injury. It is one of the five dimensions of health and wellbeing." },
  { term: "Population groups", definition: "Variations in health status between different population groups are analysed in Unit 3." },
  { term: "Prevalence", definition: "An indicator used to measure health status, referring to the number or rate of cases of a particular condition at a specific time." },
  { term: "Prerequisites for health", definition: "Fundamental conditions required for health as stated by the WHO, including peace, shelter, education, food, income, social justice, equity, stable ecosystem, and sustainable resources. Access to these promotes positive health outcomes." },
  { term: "Private health insurance", definition: "Part of Australia's health system. Its role in promoting health is analysed in terms of funding, sustainability, access, and equity. It can cover alternative medicines and provide more treatment options." },
  { term: "Reasons for improvements in Australia’s health status since 1900", definition: "Focuses on ‘old’ public health, the biomedical approach to health and improvements in medical technology, and the concept of the social model of health and the Ottawa Charter for Health Promotion." },
  { term: "Self-assessed health status", definition: "An indicator used to measure health status, based on an individual's own perception of their health." },
  { term: "Shelter", definition: "A prerequisite for health as determined by the WHO. Access to shelter promotes health outcomes." },
  { term: "Social Determinants of Health", definition: "Living and working conditions that form people's social environment, such as socioeconomic position, educational attainment, conditions of employment, distribution of wealth, empowerment, and social support. They can act to strengthen or undermine health. While this specific term isn't in the Unit 3 key knowledge list, the influencing factors (biological, sociocultural, environmental) and prerequisites align with this concept." },
  { term: "Social justice", definition: "A concept related to fairness and equity, about upholding human rights and ensuring equal access to resources and opportunities. It is a prerequisite for health as determined by the WHO. Promoting social justice is part of programs to improve Aboriginal and Torres Strait Islander Peoples’ health." },
  { term: "Social model of health", definition: "A concept related to reasons for improvements in Australia’s health status since 1900, including the Ottawa Charter for Health Promotion." },
  { term: "Social health and wellbeing", definition: "Relates to the ability to interact with others and participate in the community in both an independent and cooperative way. It includes the ability to manage and adapt to different social situations and comprises aspects such as effective communication, supportive network of friends and family, and belonging to a community. It is one of the five dimensions of health and wellbeing." },
  { term: "Sociocultural factors", definition: "Aspects of society and the social environment that impact on health and wellbeing, such as socioeconomic status, social connections, family, peers, culture, education, and income." },
  { term: "Spiritual health and wellbeing", definition: "Relates to ideas, beliefs, values, and ethics. It includes concepts of hope, peace, a guiding sense of meaning or value, and reflection on one's place in the world." },
  { term: "Stable ecosystem", definition: "A prerequisite for health as determined by the WHO. A balanced relationship between the environment and the species living in it." },
  { term: "Subjective nature (of H&W)", definition: "Refers to health and wellbeing being influenced by personal opinions, beliefs, feelings, and experiences. Perceptions can vary greatly between individuals." },
  { term: "Sustainability (of health system)", definition: "Meeting the health needs of the present without compromising the ability of future generations to meet their own health needs; relates to funding, resources, and workforce." },
  { term: "Sustainable resources", definition: "Resources used to promote health and wellbeing in the present are available for future generations." },
  { term: "Variations in health status", definition: "Differences in health status between population groups. Analysing these variations is a key skill." },
  { term: "WHO (World Health Organization)", definition: "The United Nations agency responsible for international public health. Sets global health standards, provides leadership, and supports countries to improve health." },
  { term: "YLD (Years Lived with Disability)", definition: "The non-fatal component of DALYs; a measure of how many healthy years of life are lost due to illness, injury or disability." },
  { term: "YLL (Years of Life Lost)", definition: "The fatal component of DALYs; a measure of how many years of expected life are lost due to premature death." },
];

export default function GlossaryComponent() {
  return (
    <section className="content-section">
      <h1>Glossary of Key Terms</h1>
      <p>
        A comprehensive list of important VCE HHD terminology. Understanding these
        terms is crucial for success.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {glossaryTerms.map(({ term, definition }) => (
          <div
            key={term}
            className="bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold text-lg text-purple-300">{term}</h3>
            <p className="text-sm text-slate-300 mt-1">{definition}</p>
          </div>
        ))}
      </div>
      <p className="mt-6">
        <em>
          An interactive and searchable glossary is planned. More terms will be added
          as needed.
        </em>
      </p>
    </section>
  );
}
