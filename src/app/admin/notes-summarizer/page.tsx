'use client';
import { useState } from 'react';
import Card from 'components/card';
import { FiUpload, FiDownload, FiCopy, FiCheck, FiRefreshCw, FiEye, FiEdit3, FiSettings, FiZap } from 'react-icons/fi';
import { MdSummarize, MdTextFields, MdTune, MdHighlight } from 'react-icons/md';

interface SummarySettings {
  length: 'short' | 'medium' | 'detailed';
  style: 'bullet-points' | 'paragraph' | 'outline';
  focus: 'key-concepts' | 'exam-points' | 'comprehensive';
  includeExamples: boolean;
  includeQuestions: boolean;
}

const NotesSummarizer = () => {
  const [inputNotes, setInputNotes] = useState('');
  const [summary, setSummary] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<SummarySettings>({
    length: 'medium',
    style: 'bullet-points',
    focus: 'exam-points',
    includeExamples: true,
    includeQuestions: false
  });

  const sampleNotes = `The Indian Constitution is the supreme law of India. It was adopted on 26 November 1949 and came into effect on 26 January 1950. The Constitution provides the framework for the organization of government and governance of the country.

Key Features:
1. Written Constitution - The Indian Constitution is a written document containing 395 articles and 12 schedules.
2. Federal Structure - India follows a federal system with division of powers between the Centre and States.
3. Parliamentary System - India follows the Westminster model of parliamentary democracy.
4. Fundamental Rights - The Constitution guarantees six fundamental rights to all citizens.
5. Directive Principles - These are guidelines for the government to create a welfare state.

The Constitution has been amended 105 times since its adoption. The amendment process is outlined in Article 368. Some amendments require a simple majority, while others need a special majority or ratification by states.

Important Articles:
- Article 14: Right to Equality
- Article 19: Right to Freedom
- Article 21: Right to Life and Personal Liberty
- Article 32: Right to Constitutional Remedies (Dr. Ambedkar called it the "heart and soul" of the Constitution)

The Constitution was drafted by the Constituent Assembly under the chairmanship of Dr. B.R. Ambedkar. It took 2 years, 11 months, and 18 days to complete.`;

  const generateSummary = async () => {
    if (!inputNotes.trim()) {
      alert('Please enter some notes to summarize');
      return;
    }

    setIsProcessing(true);

    // Simulate AI processing
    setTimeout(() => {
      const summaryContent = createSummary(inputNotes, settings);
      setSummary(summaryContent);
      setIsProcessing(false);
    }, 2000);
  };

  const createSummary = (notes: string, settings: SummarySettings): string => {
    // This would be replaced with actual AI summarization
    const baseContent = {
      'short': {
        'bullet-points': `# Summary - Key Points

• **Indian Constitution**: Supreme law adopted on 26 Nov 1949, effective 26 Jan 1950
• **Structure**: 395 articles, 12 schedules, written document
• **System**: Federal structure with parliamentary democracy (Westminster model)
• **Rights**: 6 fundamental rights guaranteed to citizens
• **Amendments**: 105 amendments made, process defined in Article 368
• **Key Articles**: 14 (Equality), 19 (Freedom), 21 (Life & Liberty), 32 (Constitutional Remedies)
• **Drafting**: Led by Dr. B.R. Ambedkar, took 2 years 11 months 18 days`,

        'paragraph': `# Summary - Concise Overview

The Indian Constitution, adopted on 26 November 1949 and effective from 26 January 1950, serves as India's supreme law. This comprehensive written document contains 395 articles and 12 schedules, establishing a federal parliamentary democracy based on the Westminster model. It guarantees six fundamental rights to citizens and includes directive principles for governance. The Constitution has been amended 105 times through the process outlined in Article 368. Key articles include Article 14 (Equality), Article 19 (Freedom), Article 21 (Life & Liberty), and Article 32 (Constitutional Remedies). Dr. B.R. Ambedkar led the drafting process, which took nearly three years to complete.`,

        'outline': `# Summary - Structured Outline

## I. Basic Information
   - Adopted: 26 November 1949
   - Effective: 26 January 1950
   - Status: Supreme law of India

## II. Structure & Features
   - 395 articles, 12 schedules
   - Federal parliamentary system
   - Written constitution

## III. Key Provisions
   - 6 fundamental rights
   - Directive principles
   - Amendment process (Article 368)

## IV. Important Articles
   - Article 14, 19, 21, 32

## V. Historical Context
   - Drafted by Constituent Assembly
   - Led by Dr. B.R. Ambedkar
   - Duration: 2 years, 11 months, 18 days`
      },
      'medium': {
        'bullet-points': `# Comprehensive Summary - Key Points

## Constitutional Framework
• **Adoption & Implementation**: Indian Constitution adopted on 26 November 1949, came into effect on 26 January 1950
• **Document Structure**: Written constitution with 395 articles and 12 schedules
• **Supreme Law**: Provides framework for government organization and governance

## Government Structure
• **Federal System**: Division of powers between Centre and States
• **Parliamentary Democracy**: Westminster model of governance
• **Three Pillars**: Executive, Legislature, and Judiciary

## Fundamental Provisions
• **Fundamental Rights**: Six guaranteed rights for all citizens
• **Directive Principles**: Guidelines for creating a welfare state
• **Fundamental Duties**: Added later through 42nd Amendment

## Amendment Process
• **Article 368**: Defines amendment procedure
• **Types**: Simple majority, special majority, and state ratification
• **Track Record**: 105 amendments made since adoption

## Critical Articles
• **Article 14**: Right to Equality before law
• **Article 19**: Six freedoms including speech and expression
• **Article 21**: Right to Life and Personal Liberty
• **Article 32**: Right to Constitutional Remedies (Heart and Soul)

## Historical Development
• **Constituent Assembly**: Drafting body under Dr. B.R. Ambedkar's leadership
• **Timeline**: 2 years, 11 months, and 18 days for completion
• **Influence**: Borrowed features from various world constitutions`,

        'paragraph': `# Comprehensive Summary

The Indian Constitution stands as the supreme law of India, adopted on 26 November 1949 and implemented on 26 January 1950. This extensive written document comprises 395 articles and 12 schedules, establishing the fundamental framework for governance and organization of the Indian state.

The Constitution establishes a federal parliamentary democracy following the Westminster model, creating a clear division of powers between the Central government and State governments. This federal structure ensures both unity and diversity in governance across India's vast territory.

Central to the Constitution are the Fundamental Rights, which guarantee six essential rights to all citizens, and the Directive Principles of State Policy, which serve as guidelines for the government to create a welfare state. These provisions balance individual freedoms with collective welfare.

The Constitution provides for its own amendment through Article 368, which outlines different procedures depending on the nature of the amendment. Some require simple majority, others need special majority, and certain amendments require ratification by state legislatures. Since adoption, the Constitution has been amended 105 times, demonstrating its adaptability.

Key articles include Article 14 (Right to Equality), Article 19 (Right to Freedom), Article 21 (Right to Life and Personal Liberty), and Article 32 (Right to Constitutional Remedies), which Dr. Ambedkar famously called the "heart and soul" of the Constitution.

The Constitution was drafted by the Constituent Assembly under the able leadership of Dr. B.R. Ambedkar, taking 2 years, 11 months, and 18 days to complete this monumental task.`,

        'outline': `# Comprehensive Summary - Detailed Outline

## I. Constitutional Foundation
   A. Adoption and Implementation
      1. Adopted: 26 November 1949
      2. Effective: 26 January 1950
      3. Status: Supreme law of India
   
   B. Document Characteristics
      1. Written constitution
      2. 395 articles
      3. 12 schedules
      4. Comprehensive framework

## II. Governmental Structure
   A. Federal System
      1. Division of powers
      2. Centre-State relations
      3. Three-tier governance
   
   B. Parliamentary Democracy
      1. Westminster model
      2. Executive accountability
      3. Bicameral legislature

## III. Fundamental Provisions
   A. Fundamental Rights
      1. Six guaranteed rights
      2. Individual freedoms
      3. Judicial protection
   
   B. Directive Principles
      1. State policy guidelines
      2. Welfare state objectives
      3. Non-justiciable nature
   
   C. Fundamental Duties
      1. Added through 42nd Amendment
      2. Citizen responsibilities
      3. Moral obligations

## IV. Amendment Mechanism
   A. Article 368 Provisions
      1. Amendment procedures
      2. Parliamentary powers
      3. Constitutional flexibility
   
   B. Types of Amendments
      1. Simple majority
      2. Special majority
      3. State ratification
   
   C. Amendment History
      1. 105 amendments made
      2. Evolutionary adaptation
      3. Constitutional development

## V. Key Constitutional Articles
   A. Article 14 - Right to Equality
   B. Article 19 - Right to Freedom
   C. Article 21 - Right to Life and Personal Liberty
   D. Article 32 - Right to Constitutional Remedies

## VI. Historical Development
   A. Constituent Assembly
      1. Drafting body
      2. Representative character
      3. Deliberative process
   
   B. Leadership
      1. Dr. B.R. Ambedkar as Chairman
      2. Drafting Committee
      3. Expert guidance
   
   C. Timeline
      1. Duration: 2 years, 11 months, 18 days
      2. Thorough deliberation
      3. Comprehensive coverage`
      },
      'detailed': {
        'bullet-points': `# Detailed Summary - Comprehensive Analysis

## Constitutional Genesis and Adoption
• **Historical Context**: Indian Constitution emerged from the freedom struggle and need for indigenous governance framework
• **Adoption Date**: 26 November 1949 (celebrated as Constitution Day)
• **Implementation**: 26 January 1950 (Republic Day) - chosen to honor Purna Swaraj declaration
• **Legal Status**: Supreme law of India, source of all governmental authority

## Structural Composition and Features
• **Document Size**: 395 articles (originally 395, now 448 after amendments) and 12 schedules
• **Written Nature**: Longest written constitution in the world
• **Comprehensive Scope**: Covers all aspects of governance, rights, and state organization
• **Flexibility**: Provides for its own amendment while maintaining basic structure

## Governmental Architecture
• **Federal Structure**: Quasi-federal system with strong center
• **Parliamentary System**: Westminster model with Indian adaptations
• **Separation of Powers**: Executive, Legislature, and Judiciary with checks and balances
• **Bicameralism**: Two houses at center (Lok Sabha, Rajya Sabha) and some states

## Fundamental Rights Framework
• **Six Categories**: Equality, Freedom, Exploitation, Religion, Culture & Education, Constitutional Remedies
• **Justiciable Nature**: Enforceable through courts, especially Supreme Court
• **Reasonable Restrictions**: Rights subject to reasonable restrictions for public order, morality, etc.
• **Evolution**: Expanded interpretation through judicial activism and amendments

## Directive Principles of State Policy
• **Welfare State Vision**: Guidelines for creating socio-economic democracy
• **Non-justiciable**: Cannot be enforced through courts but fundamental in governance
• **Comprehensive Coverage**: Economic, social, and political justice
• **Complementary Role**: Balance individual rights with collective welfare

## Amendment Process and Constitutional Evolution
• **Article 368**: Primary amendment provision with different procedures
• **Three Types**: Simple majority, special majority, special majority + state ratification
• **105 Amendments**: Significant changes including 42nd (Mini Constitution), 44th (restoration), 73rd-74th (local governance)
• **Basic Structure Doctrine**: Judicial innovation limiting amendment power

## Critical Constitutional Articles
• **Article 14**: Equality before law and equal protection - foundation of rule of law
• **Article 19**: Six freedoms including speech, assembly, movement - cornerstone of democracy
• **Article 21**: Life and personal liberty - most expansively interpreted right
• **Article 32**: Constitutional remedies - enables enforcement of fundamental rights
• **Article 356**: President's rule - federal emergency provision
• **Article 370**: Special status (now abrogated) - demonstrated constitutional flexibility

## Drafting Process and Leadership
• **Constituent Assembly**: 389 members representing diverse interests and regions
• **Dr. B.R. Ambedkar**: Chairman of Drafting Committee, chief architect
• **Timeline**: 2 years, 11 months, 18 days of meticulous deliberation
• **Borrowed Features**: Selective adoption from various world constitutions
• **Indigenous Elements**: Adapted to Indian conditions and values

## Constitutional Philosophy and Values
• **Preamble**: Encapsulates constitutional vision - Justice, Liberty, Equality, Fraternity
• **Secular Character**: Equal respect for all religions
• **Democratic Ideals**: Popular sovereignty and representative government
• **Social Justice**: Commitment to reducing inequalities and empowering marginalized sections`,

        'paragraph': `# Detailed Constitutional Analysis

The Indian Constitution represents one of the most comprehensive and thoughtful constitutional documents in modern history. Adopted on 26 November 1949 and implemented on 26 January 1950, it emerged from the crucible of India's freedom struggle and the pressing need for an indigenous framework of governance that could unite a diverse nation while ensuring justice and equality for all citizens.

Structurally, the Constitution is the longest written constitution in the world, originally containing 395 articles and 12 schedules, though subsequent amendments have expanded it to 448 articles. This comprehensive document covers every aspect of governance, from the organization of government institutions to the rights and duties of citizens, reflecting the founding fathers' determination to create a complete framework for democratic governance.

The Constitution establishes a quasi-federal parliamentary democracy that borrows the Westminster model while adapting it to Indian conditions. The federal structure provides for division of powers between the Centre and States through three lists - Union, State, and Concurrent - while maintaining a strong center to ensure national unity. The parliamentary system ensures executive accountability to the legislature, while the separation of powers among the executive, legislature, and judiciary provides essential checks and balances.

Central to the constitutional framework are the Fundamental Rights, which guarantee six categories of rights to all citizens: equality, freedom, protection against exploitation, religious freedom, cultural and educational rights, and constitutional remedies. These rights are justiciable, meaning they can be enforced through courts, particularly the Supreme Court, which serves as the guardian of the Constitution. The rights are not absolute but subject to reasonable restrictions in the interest of public order, morality, and national security.

Complementing the Fundamental Rights are the Directive Principles of State Policy, which provide guidelines for the government to create a welfare state. Though non-justiciable, these principles are fundamental in governance and aim to establish social, economic, and political justice. They represent the Constitution's vision of transforming India from a political democracy into a social and economic democracy.

The Constitution provides for its own amendment through Article 368, which outlines three different procedures depending on the nature of the amendment. This flexibility has allowed the Constitution to evolve with changing times, as evidenced by 105 amendments made since adoption. However, the Supreme Court's basic structure doctrine ensures that the fundamental character of the Constitution cannot be altered.

Several articles hold special significance in the constitutional scheme. Article 14 establishes equality before law, forming the foundation of the rule of law. Article 19 guarantees six fundamental freedoms that are essential for a democratic society. Article 21, protecting life and personal liberty, has been most expansively interpreted by the courts to include various aspects of human dignity. Article 32, called the "heart and soul" of the Constitution by Dr. Ambedkar, provides the mechanism for enforcing fundamental rights.

The Constitution was drafted by the Constituent Assembly comprising 389 members representing diverse interests, regions, and communities. Under the leadership of Dr. B.R. Ambedkar as Chairman of the Drafting Committee, this body deliberated for 2 years, 11 months, and 18 days, examining various constitutional models and adapting the best features to Indian conditions. The result was a document that balanced borrowed wisdom with indigenous values and aspirations.

The constitutional philosophy, encapsulated in the Preamble, commits India to justice, liberty, equality, and fraternity. The Constitution establishes India as a secular, democratic republic where sovereignty rests with the people. It embodies the vision of social justice and the commitment to reducing inequalities while empowering marginalized sections of society. This comprehensive framework has enabled India to maintain democratic governance while managing its vast diversity and complex challenges.`,

        'outline': `# Detailed Constitutional Analysis - Complete Outline

## I. Historical Genesis and Constitutional Foundation
   A. Pre-Independence Context
      1. Colonial constitutional experiments
      2. Freedom struggle and constitutional demands
      3. Cabinet Mission Plan and Constituent Assembly
   
   B. Adoption and Implementation
      1. Adoption: 26 November 1949 (Constitution Day)
      2. Implementation: 26 January 1950 (Republic Day)
      3. Symbolic significance of chosen dates
      4. Transition from colonial to constitutional governance
   
   C. Constitutional Character
      1. Supreme law of the land
      2. Source of all governmental authority
      3. Written and comprehensive nature
      4. Longest constitution in the world

## II. Structural Architecture and Composition
   A. Document Organization
      1. Original structure: 395 articles, 12 schedules
      2. Current structure: 448 articles (post-amendments)
      3. 22 parts covering different aspects
      4. Schedules containing detailed provisions
   
   B. Constitutional Features
      1. Written and rigid-flexible nature
      2. Federal structure with unitary bias
      3. Parliamentary system of government
      4. Independent judiciary with judicial review
   
   C. Borrowed and Indigenous Elements
      1. Westminster model (UK)
      2. Fundamental rights (USA)
      3. Directive principles (Ireland)
      4. Emergency provisions (Germany)
      5. Indigenous adaptations and innovations

## III. Governmental Structure and Organization
   A. Federal Framework
      1. Division of powers: Union, State, Concurrent lists
      2. Centre-State relations
      3. Inter-state relations
      4. Emergency provisions affecting federalism
   
   B. Parliamentary Democracy
      1. Westminster model adaptation
      2. Executive accountability to legislature
      3. Collective responsibility
      4. Parliamentary sovereignty vs. constitutional supremacy
   
   C. Institutional Framework
      1. Executive: President, Prime Minister, Council of Ministers
      2. Legislature: Parliament (Lok Sabha, Rajya Sabha)
      3. Judiciary: Supreme Court, High Courts, subordinate courts
      4. Constitutional bodies and commissions

## IV. Fundamental Rights and Freedoms
   A. Six Categories of Rights
      1. Right to Equality (Articles 14-18)
      2. Right to Freedom (Articles 19-22)
      3. Right against Exploitation (Articles 23-24)
      4. Right to Freedom of Religion (Articles 25-28)
      5. Cultural and Educational Rights (Articles 29-30)
      6. Right to Constitutional Remedies (Article 32)
   
   B. Characteristics and Limitations
      1. Justiciable nature
      2. Reasonable restrictions
      3. Emergency suspension provisions
      4. Judicial interpretation and expansion
   
   C. Evolution and Judicial Activism
      1. Expansive interpretation of Article 21
      2. Right to privacy recognition
      3. Environmental rights development
      4. Social justice through rights

## V. Directive Principles and State Policy
   A. Philosophical Foundation
      1. Welfare state vision
      2. Social and economic democracy
      3. Gandhian influence
      4. Socialist principles
   
   B. Classification and Content
      1. Socialist principles
      2. Gandhian principles
      3. Liberal-intellectual principles
      4. Comprehensive coverage of state obligations
   
   C. Implementation and Significance
      1. Non-justiciable nature
      2. Fundamental in governance
      3. Complementarity with fundamental rights
      4. Policy guidance and judicial interpretation

## VI. Amendment Process and Constitutional Evolution
   A. Article 368 Framework
      1. Parliament's constituent power
      2. Three types of amendment procedures
      3. Simple majority amendments
      4. Special majority requirements
      5. Special majority plus state ratification
   
   B. Significant Amendments
      1. 1st Amendment (1951): Land reforms and free speech
      2. 42nd Amendment (1976): Mini Constitution
      3. 44th Amendment (1978): Restoration of balance
      4. 73rd-74th Amendments (1992): Local governance
      5. Recent amendments and their impact
   
   C. Judicial Limitations
      1. Basic structure doctrine (Kesavananda Bharati case)
      2. Implied limitations on amendment power
      3. Judicial review of amendments
      4. Constitutional identity preservation

## VII. Key Constitutional Provisions
   A. Fundamental Articles
      1. Article 14: Equality and rule of law
      2. Article 19: Democratic freedoms
      3. Article 21: Life, liberty, and human dignity
      4. Article 32: Constitutional remedies and enforcement
   
   B. Structural Articles
      1. Article 356: President's rule and federalism
      2. Article 368: Amendment process
      3. Article 370: Special provisions (historical significance)
      4. Articles 73-74: Centre-State relations
   
   C. Institutional Articles
      1. Articles related to Parliament
      2. Articles on executive powers
      3. Articles on judicial independence
      4. Articles on constitutional bodies

## VIII. Drafting Process and Constitutional Making
   A. Constituent Assembly
      1. Composition and representation
      2. 389 members from diverse backgrounds
      3. Committee structure and functioning
      4. Deliberative process and debates
   
   B. Leadership and Key Figures
      1. Dr. B.R. Ambedkar: Chief Architect
      2. Drafting Committee and its role
      3. Other prominent members and contributions
      4. Consensus building and compromise
   
   C. Timeline and Process
      1. Duration: 2 years, 11 months, 18 days
      2. 11 sessions and 165 days of deliberation
      3. Clause-by-clause consideration
      4. Multiple readings and refinements
   
   D. Influences and Sources
      1. Comparative constitutional study
      2. Government of India Acts
      3. International best practices
      4. Indigenous political traditions

## IX. Constitutional Philosophy and Values
   A. Preamble and Vision
      1. Justice: Social, economic, political
      2. Liberty: Thought, expression, belief, faith, worship
      3. Equality: Status and opportunity
      4. Fraternity: Dignity and unity
   
   B. Fundamental Principles
      1. Popular sovereignty
      2. Democratic governance
      3. Secular character
      4. Federal structure
      5. Rule of law
   
   C. Social Transformation Goals
      1. Elimination of inequalities
      2. Empowerment of marginalized sections
      3. Social justice and inclusion
      4. Economic development with equity

## X. Contemporary Relevance and Challenges
   A. Adaptability and Resilience
      1. 75+ years of successful operation
      2. Accommodation of diverse challenges
      3. Evolution through interpretation
      4. Democratic stability and continuity
   
   B. Current Debates and Issues
      1. Centre-State relations
      2. Judicial activism vs. restraint
      3. Rights vs. security balance
      4. Constitutional morality and values
   
   C. Future Prospects
      1. Emerging challenges and opportunities
      2. Constitutional adaptation needs
      3. Preservation of constitutional spirit
      4. Democratic deepening and strengthening`
      }
    };

    let result = baseContent[settings.length][settings.style];

    if (settings.includeExamples) {
      result += `\n\n## 📚 Exam-Relevant Examples\n\n• **Constitutional Cases**: Kesavananda Bharati (Basic Structure), Maneka Gandhi (Article 21 expansion)\n• **Amendment Examples**: 42nd Amendment (Emergency period changes), 73rd-74th (Panchayati Raj)\n• **Practical Applications**: Right to Education Act (Article 21A), RTI Act (Article 19)`;
    }

    if (settings.includeQuestions) {
      result += `\n\n## ❓ Practice Questions\n\n1. **Prelims**: Which article is known as the "Heart and Soul" of the Constitution?\n   a) Article 14  b) Article 19  c) Article 21  d) Article 32\n\n2. **Mains**: Discuss the significance of the basic structure doctrine in preserving constitutional identity.\n\n3. **Current Affairs**: Analyze the impact of recent constitutional amendments on federal structure.`;
    }

    return result;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const downloadSummary = () => {
    const blob = new Blob([summary], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'notes_summary.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadSampleNotes = () => {
    setInputNotes(sampleNotes);
  };

  const clearAll = () => {
    setInputNotes('');
    setSummary('');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-navy-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card extra="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-100 dark:bg-brand-900/20 rounded-xl flex items-center justify-center">
                <MdSummarize className="h-5 w-5 text-brand-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-navy-700 dark:text-white">
                  AI Notes Summarizer
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Transform lengthy notes into concise, exam-focused summaries
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300 transition-colors"
                title="Settings"
              >
                <FiSettings className="h-4 w-4" />
              </button>
              
              <button
                onClick={loadSampleNotes}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm transition-colors"
              >
                Load Sample
              </button>
              
              <button
                onClick={clearAll}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg text-sm transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">AI-Powered</p>
              <p className="text-xs text-blue-600/70 dark:text-blue-400/70">Summarization</p>
            </div>
            <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-lg font-bold text-green-600 dark:text-green-400">3 Styles</p>
              <p className="text-xs text-green-600/70 dark:text-green-400/70">Output Formats</p>
            </div>
            <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <p className="text-lg font-bold text-purple-600 dark:text-purple-400">Exam-Focused</p>
              <p className="text-xs text-purple-600/70 dark:text-purple-400/70">Content</p>
            </div>
            <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <p className="text-lg font-bold text-orange-600 dark:text-orange-400">Instant</p>
              <p className="text-xs text-orange-600/70 dark:text-orange-400/70">Results</p>
            </div>
          </div>
        </Card>

        {/* Settings Panel */}
        {showSettings && (
          <Card extra="p-6">
            <h2 className="text-lg font-semibold text-navy-700 dark:text-white mb-4 flex items-center gap-2">
              <MdTune className="h-4 w-4" />
              Summarization Settings
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Summary Length */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Summary Length
                </label>
                <div className="space-y-2">
                  {(['short', 'medium', 'detailed'] as const).map((length) => (
                    <label key={length} className="flex items-center">
                      <input
                        type="radio"
                        name="length"
                        value={length}
                        checked={settings.length === length}
                        onChange={(e) => setSettings(prev => ({ ...prev, length: e.target.value as any }))}
                        className="mr-2"
                      />
                      <span className="text-sm capitalize text-gray-700 dark:text-gray-300">
                        {length} {length === 'short' ? '(~200 words)' : length === 'medium' ? '(~500 words)' : '(~1000+ words)'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Summary Style */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Output Style
                </label>
                <div className="space-y-2">
                  {(['bullet-points', 'paragraph', 'outline'] as const).map((style) => (
                    <label key={style} className="flex items-center">
                      <input
                        type="radio"
                        name="style"
                        value={style}
                        checked={settings.style === style}
                        onChange={(e) => setSettings(prev => ({ ...prev, style: e.target.value as any }))}
                        className="mr-2"
                      />
                      <span className="text-sm capitalize text-gray-700 dark:text-gray-300">
                        {style.replace('-', ' ')}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Focus Area */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Focus Area
                </label>
                <div className="space-y-2">
                  {(['key-concepts', 'exam-points', 'comprehensive'] as const).map((focus) => (
                    <label key={focus} className="flex items-center">
                      <input
                        type="radio"
                        name="focus"
                        value={focus}
                        checked={settings.focus === focus}
                        onChange={(e) => setSettings(prev => ({ ...prev, focus: e.target.value as any }))}
                        className="mr-2"
                      />
                      <span className="text-sm capitalize text-gray-700 dark:text-gray-300">
                        {focus.replace('-', ' ')}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Additional Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Include
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.includeExamples}
                      onChange={(e) => setSettings(prev => ({ ...prev, includeExamples: e.target.checked }))}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Examples</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.includeQuestions}
                      onChange={(e) => setSettings(prev => ({ ...prev, includeQuestions: e.target.checked }))}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Practice Questions</span>
                  </label>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <Card extra="p-6 h-fit">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-navy-700 dark:text-white flex items-center gap-2">
                <FiUpload className="h-4 w-4" />
                Input Notes
              </h2>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {inputNotes.length} characters
              </div>
            </div>

            <textarea
              value={inputNotes}
              onChange={(e) => setInputNotes(e.target.value)}
              placeholder="Paste your study notes here... (minimum 100 characters for better results)"
              className="w-full h-96 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-navy-800 text-navy-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 resize-none font-mono text-sm"
            />

            <div className="mt-4 flex gap-3">
              <button
                onClick={generateSummary}
                disabled={isProcessing || inputNotes.length < 50}
                className="flex-1 flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <FiZap className="h-4 w-4" />
                    Generate Summary
                  </>
                )}
              </button>
            </div>

            {/* Tips */}
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-1 text-sm">💡 Tips for Better Results:</h4>
              <ul className="text-xs text-blue-600 dark:text-blue-400 space-y-1">
                <li>• Include clear headings and structure in your notes</li>
                <li>• Minimum 100 characters for meaningful summaries</li>
                <li>• Use bullet points or numbered lists for better parsing</li>
                <li>• Include key terms, dates, and important concepts</li>
              </ul>
            </div>
          </Card>

          {/* Output Section */}
          <Card extra="p-6 h-fit">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-navy-700 dark:text-white flex items-center gap-2">
                <MdHighlight className="h-4 w-4" />
                Generated Summary
              </h2>
              
              {summary && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300 transition-colors"
                    title="Copy to Clipboard"
                  >
                    {copied ? <FiCheck className="h-4 w-4 text-green-500" /> : <FiCopy className="h-4 w-4" />}
                  </button>
                  
                  <button
                    onClick={downloadSummary}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300 transition-colors"
                    title="Download as Markdown"
                  >
                    <FiDownload className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {summary ? (
              <div className="space-y-4">
                {/* Summary Settings Display */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium">
                    {settings.length} length
                  </span>
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full text-xs font-medium">
                    {settings.style.replace('-', ' ')} style
                  </span>
                  <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-full text-xs font-medium">
                    {settings.focus.replace('-', ' ')} focus
                  </span>
                </div>

                {/* Summary Content */}
                <div className="bg-gray-50 dark:bg-navy-800 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-navy-700 dark:text-white">
                      {summary}
                    </pre>
                  </div>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-center">
                    <p className="text-lg font-bold text-navy-700 dark:text-white">
                      {summary.split(' ').length}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Words</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-navy-700 dark:text-white">
                      {summary.length}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Characters</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-navy-700 dark:text-white">
                      {Math.round((summary.length / inputNotes.length) * 100)}%
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Compression</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-96 flex items-center justify-center text-center">
                <div>
                  <MdSummarize className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                    No Summary Generated
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Enter your notes and click "Generate Summary" to get started
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Features Overview */}
        <Card extra="p-6">
          <h2 className="text-lg font-semibold text-navy-700 dark:text-white mb-4">
            Summarization Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <MdTextFields className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-navy-700 dark:text-white mb-2">Multiple Formats</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Bullet points, paragraphs, or structured outlines
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <FiZap className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-navy-700 dark:text-white mb-2">AI-Powered</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Advanced algorithms for intelligent summarization
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <MdHighlight className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-navy-700 dark:text-white mb-2">Exam-Focused</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Highlights key concepts and exam-relevant points
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <FiDownload className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="font-semibold text-navy-700 dark:text-white mb-2">Export Ready</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Download as Markdown or copy to clipboard
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NotesSummarizer;