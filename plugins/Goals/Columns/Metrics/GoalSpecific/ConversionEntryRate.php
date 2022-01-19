<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
namespace Piwik\Plugins\Goals\Columns\Metrics\GoalSpecific;

use Piwik\DataTable\Row;
use Piwik\Metrics\Formatter;
use Piwik\Piwik;
use Piwik\Metrics;
use Piwik\Plugins\Goals\Columns\Metrics\GoalSpecificProcessedMetric;
use Piwik\Plugins\Goals\Goals;

/**
 * The conversion rate for a specific goal. Calculated as:
 *
 *     goal's nb_conversions / entry_nb_visits
 *
 * The goal's nb_conversions is calculated by the Goal archiver and nb_visits
 * by the core archiving process.
 */
class ConversionEntryRate extends GoalSpecificProcessedMetric
{
    public function getName()
    {
        return Goals::makeGoalColumn($this->idGoal, 'nb_conversions_entry_rate', false);
    }

    public function getTranslatedName()
    {
        return Piwik::translate('Goals_ColumnConversionEntryRate', $this->getGoalName());
    }

    public function getDocumentation()
    {
        return Piwik::translate('Goals_ColumnConversionEntryRateDocumentation', $this->getGoalNameForDocs());
    }

    public function getDependentMetrics()
    {
        return array('goals', 'entry_nb_visits');
    }

    public function compute(Row $row)
    {
        $mappingFromNameToIdGoal = Metrics::getMappingFromNameToIdGoal();

        $goalMetrics = $this->getGoalMetrics($row);

        $nbEntrances = $this->getMetric($row, 'entry_nb_visits');
        $conversions = $this->getMetric($goalMetrics, 'nb_conversions_entry', $mappingFromNameToIdGoal);

        if ($nbEntrances !== false && is_numeric($nbEntrances) && $nbEntrances > 0) {
            return Piwik::getQuotientSafe($conversions, $nbEntrances, 3);
        }

        return 0;
    }

    public function format($value, Formatter $formatter)
    {
        return $formatter->getPrettyPercentFromQuotient($value);
    }

}
